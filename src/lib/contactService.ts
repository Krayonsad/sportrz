// src/lib/contactService.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  serverTimestamp,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { ContactMessage, ContactFormData } from '@/types/contact';

export class ContactService {
  private static readonly COLLECTION_NAME = 'contactMessages';

  /**
   * Submit a new contact message
   */
  static async submitMessage(formData: ContactFormData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'unread',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact message:', error);
      throw new Error('Failed to submit message');
    }
  }

  /**
   * Get all contact messages
   */
  static async getAllMessages(): Promise<ContactMessage[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const messages: ContactMessage[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt
        } as ContactMessage);
      });
      
      return messages;
    } catch (error) {
      console.error('Error getting contact messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  /**
   * Get unread messages count
   */
  static async getUnreadCount(): Promise<number> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('status', '==', 'unread')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }

  /**
   * Mark message as read
   */
  static async markAsRead(messageId: string): Promise<void> {
    try {
      const messageRef = doc(db, this.COLLECTION_NAME, messageId);
      await updateDoc(messageRef, {
        status: 'read',
        readAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }

  /**
   * Mark message as unread
   */
  static async markAsUnread(messageId: string): Promise<void> {
    try {
      const messageRef = doc(db, this.COLLECTION_NAME, messageId);
      await updateDoc(messageRef, {
        status: 'unread'
      });
    } catch (error) {
      console.error('Error marking message as unread:', error);
      throw new Error('Failed to mark message as unread');
    }
  }

  /**
   * Delete a message
   */
  static async deleteMessage(messageId: string): Promise<void> {
    try {
      const messageRef = doc(db, this.COLLECTION_NAME, messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }

  /**
   * Get messages by status
   */
  static async getMessagesByStatus(status: 'read' | 'unread'): Promise<ContactMessage[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const messages: ContactMessage[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt
        } as ContactMessage);
      });
      
      return messages;
    } catch (error) {
      console.error('Error getting messages by status:', error);
      throw new Error('Failed to fetch messages');
    }
  }

  /**
   * Subscribe to messages changes (real-time)
   */
  static subscribeToMessages(callback: (messages: ContactMessage[]) => void): () => void {
    const q = query(
      collection(db, this.COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages: ContactMessage[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt
        } as ContactMessage);
      });
      callback(messages);
    }, (error) => {
      console.error('Error in messages subscription:', error);
    });
  }

  /**
   * Subscribe to unread count changes
   */
  static subscribeToUnreadCount(callback: (count: number) => void): () => void {
    const q = query(
      collection(db, this.COLLECTION_NAME),
      where('status', '==', 'unread')
    );

    return onSnapshot(q, (snapshot) => {
      callback(snapshot.size);
    }, (error) => {
      console.error('Error in unread count subscription:', error);
    });
  }

  /**
   * Search messages by text
   */
  static async searchMessages(searchTerm: string): Promise<ContactMessage[]> {
    try {
      // Note: This is a basic implementation. For better search functionality,
      // consider using Algolia or implementing full-text search
      const messages = await this.getAllMessages();
      const lowercaseSearch = searchTerm.toLowerCase();
      
      return messages.filter(message => 
        message.name.toLowerCase().includes(lowercaseSearch) ||
        message.email.toLowerCase().includes(lowercaseSearch) ||
        message.subject.toLowerCase().includes(lowercaseSearch) ||
        message.message.toLowerCase().includes(lowercaseSearch)
      );
    } catch (error) {
      console.error('Error searching messages:', error);
      throw new Error('Failed to search messages');
    }
  }

  /**
   * Get messages statistics
   */
  static async getMessageStats(): Promise<{
    total: number;
    unread: number;
    read: number;
    bySubject: Record<string, number>;
  }> {
    try {
      const messages = await this.getAllMessages();
      const stats = {
        total: messages.length,
        unread: messages.filter(m => m.status === 'unread').length,
        read: messages.filter(m => m.status === 'read').length,
        bySubject: {} as Record<string, number>
      };

      // Count by subject
      messages.forEach(message => {
        stats.bySubject[message.subject] = (stats.bySubject[message.subject] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Error getting message stats:', error);
      throw new Error('Failed to get message statistics');
    }
  }
}