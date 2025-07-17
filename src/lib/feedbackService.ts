// src/lib/feedbackService.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Feedback {
  id?: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

export interface FeedbackForm {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

const FEEDBACK_COLLECTION = 'feedback';

export class FeedbackService {
  // Submit new feedback
  static async submitFeedback(feedback: FeedbackForm): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, FEEDBACK_COLLECTION), {
        name: feedback.name,
        email: feedback.email,
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw new Error('Failed to submit feedback');
    }
  }

  // Get top 5 reviews by rating
  static async getTopReviews(): Promise<Feedback[]> {
    try {
      const q = query(
        collection(db, FEEDBACK_COLLECTION),
        orderBy('rating', 'desc'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      
      const querySnapshot = await getDocs(q);
      const reviews: Feedback[] = [];
      
      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        } as Feedback);
      });
      
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new Error('Failed to fetch reviews');
    }
  }

  // Get all feedback (for admin use)
  static async getAllFeedback(): Promise<Feedback[]> {
    try {
      const q = query(
        collection(db, FEEDBACK_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const feedback: Feedback[] = [];
      
      querySnapshot.forEach((doc) => {
        feedback.push({
          id: doc.id,
          ...doc.data()
        } as Feedback);
      });
      
      return feedback;
    } catch (error) {
      console.error('Error fetching all feedback:', error);
      throw new Error('Failed to fetch feedback');
    }
  }

  // Calculate average rating
  static calculateAverageRating(reviews: Feedback[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }

  // Get rating counts for breakdown
  static getRatingCounts(reviews: Feedback[]): number[] {
    const counts = [0, 0, 0, 0, 0]; // [5-star, 4-star, 3-star, 2-star, 1-star]
    
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[5 - review.rating]++;
      }
    });
    
    return counts;
  }
}