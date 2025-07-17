// src/lib/gameTrackingService.ts
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { RecentlyPlayedGame, UserProfile } from '@/types/user';
import { GameInfo } from '@/types/game';

export class GameTrackingService {
  private static readonly MAX_RECENT_GAMES = 10;

  /**
   * Track a game play for a user
   */
  static async trackGamePlay(userId: string, game: GameInfo): Promise<void> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      const newRecentGame: RecentlyPlayedGame = {
        gameId: game.id,
        gameName: game.name,
        playedAt: new Date(),
        categories: game.categories,
        thumbnail: game.thumbnail
      };

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        let recentlyPlayed = userData.recentlyPlayed || [];

        // Remove the game if it already exists in the list
        recentlyPlayed = recentlyPlayed.filter(rg => rg.gameId !== game.id);

        // Add the new game at the beginning
        recentlyPlayed.unshift(newRecentGame);

        // Keep only the last 10 games
        if (recentlyPlayed.length > this.MAX_RECENT_GAMES) {
          recentlyPlayed = recentlyPlayed.slice(0, this.MAX_RECENT_GAMES);
        }

        await updateDoc(userDocRef, {
          recentlyPlayed,
          updatedAt: new Date()
        });
      } else {
        // Create new user document with the first game
        await setDoc(userDocRef, {
          uid: userId,
          recentlyPlayed: [newRecentGame],
          createdAt: new Date(),
          updatedAt: new Date()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Error tracking game play:', error);
      throw error;
    }
  }

  /**
   * Get recently played games for a user
   */
  static async getRecentlyPlayedGames(userId: string): Promise<RecentlyPlayedGame[]> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        return userData.recentlyPlayed || [];
      }

      return [];
    } catch (error) {
      console.error('Error getting recently played games:', error);
      return [];
    }
  }

  /**
   * Clear recently played games for a user
   */
  static async clearRecentlyPlayedGames(userId: string): Promise<void> {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        recentlyPlayed: [],
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error clearing recently played games:', error);
      throw error;
    }
  }

  /**
   * Remove a specific game from recently played
   */
  static async removeFromRecentlyPlayed(userId: string, gameId: string): Promise<void> {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        const recentlyPlayed = userData.recentlyPlayed || [];
        
        const updatedRecentlyPlayed = recentlyPlayed.filter(game => game.gameId !== gameId);
        
        await updateDoc(userDocRef, {
          recentlyPlayed: updatedRecentlyPlayed,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error removing game from recently played:', error);
      throw error;
    }
  }
}