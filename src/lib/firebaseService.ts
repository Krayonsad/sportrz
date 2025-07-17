// src/lib/firebaseService.ts
import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  addDoc, 
  query, 
  orderBy, 
  where,
  writeBatch 
} from 'firebase/firestore';
import { GameInfo, Review } from '@/types/game';

// Collections
const GAMES_COLLECTION = 'games';
const CATEGORIES_COLLECTION = 'categories';

// Game Service Functions
export const gameService = {
  // Get all games
  async getAllGames(): Promise<GameInfo[]> {
    try {
      const gamesRef = collection(db, GAMES_COLLECTION);
      const snapshot = await getDocs(gamesRef);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GameInfo[];
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  // Get game by ID
  async getGameById(id: string): Promise<GameInfo | null> {
    try {
      const gameRef = doc(db, GAMES_COLLECTION, id);
      const snapshot = await getDocs(query(collection(db, GAMES_COLLECTION), where('id', '==', id)));
      
      if (!snapshot.empty) {
        const gameDoc = snapshot.docs[0];
        return {
          id: gameDoc.id,
          ...gameDoc.data()
        } as GameInfo;
      }
      return null;
    } catch (error) {
      console.error('Error fetching game:', error);
      throw error;
    }
  },

  // Get games by category
  async getGamesByCategory(category: string): Promise<GameInfo[]> {
    try {
      const gamesRef = collection(db, GAMES_COLLECTION);
      const q = query(gamesRef, where('categories', 'array-contains', category));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GameInfo[];
    } catch (error) {
      console.error('Error fetching games by category:', error);
      throw error;
    }
  },

  // Add a new game
  async addGame(game: Omit<GameInfo, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, GAMES_COLLECTION), game);
      return docRef.id;
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  },

  // Update a game
  async updateGame(id: string, game: Partial<GameInfo>): Promise<void> {
    try {
      const gameRef = doc(db, GAMES_COLLECTION, id);
      await setDoc(gameRef, game, { merge: true });
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  },

  // Batch import games (for migration)
  async batchImportGames(games: Record<string, GameInfo>): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      Object.entries(games).forEach(([key, game]) => {
        const gameRef = doc(db, GAMES_COLLECTION, key);
        batch.set(gameRef, game);
      });
      
      await batch.commit();
      console.log('Games imported successfully');
    } catch (error) {
      console.error('Error importing games:', error);
      throw error;
    }
  }
};

// Category Service Functions
export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<string[]> {
    try {
      const categoriesRef = collection(db, CATEGORIES_COLLECTION);
      const snapshot = await getDocs(query(categoriesRef, orderBy('order')));
      
      return snapshot.docs.map(doc => doc.data().name as string);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Add a category
  async addCategory(name: string, order: number): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
        name,
        order
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },

  // Batch import categories (for migration)
  async batchImportCategories(categories: string[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      categories.forEach((category, index) => {
        const categoryRef = doc(db, CATEGORIES_COLLECTION, category.toLowerCase().replace(/\s+/g, '-'));
        batch.set(categoryRef, {
          name: category,
          order: index
        });
      });
      
      await batch.commit();
      console.log('Categories imported successfully');
    } catch (error) {
      console.error('Error importing categories:', error);
      throw error;
    }
  }
};

// Migration utility functions
export const migrationUtils = {
  // Migrate data from your current JSON structure to Firebase
  async migrateData() {
    try {
      console.log('Starting migration...');
      
      // Your current games data
      const gamesData = {
        "arcade1": {
          "id": "arcade1",
          "name": "Jump Mania",
          "categories": ["Arcade"],
          "path": "/Games/arcade1/index.html",
          "thumbnail": "/thumbnails/arcade1.png"
        },
        "arcade2": {
          "id": "arcade2",
          "name": "Cube Runner",
          "categories": ["Arcade"],
          "path": "/Games/arcade2/index.html",
          "thumbnail": "/thumbnails/arcade2.png"
        },
        "arcade3": {
          "id": "arcade3",
          "name": "Meteor Dodge",
          "categories": ["Arcade"],
          "path": "/Games/arcade3/index.html",
          "thumbnail": "/thumbnails/arcade3.png"
        },
        "arcade4": {
          "id": "arcade4",
          "name": "Neon Dash",
          "categories": ["Arcade"],
          "path": "/Games/arcade4/index.html",
          "thumbnail": "/thumbnails/arcade4.png"
        },
        "arcade5": {
          "id": "arcade5",
          "name": "Fruit Slash",
          "categories": ["Arcade"],
          "path": "/Games/arcade5/index.html",
          "thumbnail": "/thumbnails/arcade5.png"
        },
        "arcade6": {
          "id": "arcade6",
          "name": "Ball Hop",
          "categories": ["Arcade"],
          "path": "/Games/arcade6/index.html",
          "thumbnail": "/thumbnails/arcade6.png"
        },
        "arcade7": {
          "id": "arcade7",
          "name": "Sky Fall",
          "categories": ["Arcade"],
          "path": "/Games/arcade7/index.html",
          "thumbnail": "/thumbnails/arcade7.png"
        },
        "strategy1": {
          "id": "strategy1",
          "name": "Empire Rise",
          "categories": ["Strategy"],
          "path": "/Games/strategy1/index.html",
          "thumbnail": "/thumbnails/strategy1.png"
        },
        "strategy2": {
          "id": "strategy2",
          "name": "Hexa Wars",
          "categories": ["Strategy"],
          "path": "/Games/strategy2/index.html",
          "thumbnail": "/thumbnails/strategy2.png"
        },
        "strategy3": {
          "id": "strategy3",
          "name": "Tower Siege",
          "categories": ["Strategy"],
          "path": "/Games/strategy3/index.html",
          "thumbnail": "/thumbnails/strategy3.png"
        }
      };

      // Your current categories data
      const categoriesData = [
        "Arcade",
        "Casual",
        "Strategy",
        "Defense",
        "Racing",
        "Sports",
        "Puzzle",
        "Shooter",
        "Horror",
        "Board & Card",
        "Educational",
        "Platformer",
        "Simulation",
        "Physics",
        "Kids",
        "Idle / Clicker",
        "Music / Rhythm",
        "Trivia / Quiz"
      ];

      // Import categories first
      await categoryService.batchImportCategories(categoriesData);
      
      // Then import games
      await gameService.batchImportGames(gamesData);
      
      console.log('Migration completed successfully!');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }
  
};

// Review Service Functions
export const reviewService = {
  // Get top 5 reviews (highest rating first, then by date)
  async getTopReviews(): Promise<Review[]> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, orderBy('rating', 'desc'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.slice(0, 5).map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
    } catch (error) {
      console.error('Error fetching top reviews:', error);
      throw error;
    }
  },

  // Add a new review
  async addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<string> {
    try {
      const reviewData = {
        ...review,
        timestamp: Date.now()
      };
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Get all reviews for admin (if needed later)
  async getAllReviews(): Promise<Review[]> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      throw error;
    }
  }
};