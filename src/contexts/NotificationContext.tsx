// src/contexts/NotificationContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Notification {
  id: string;
  type: 'welcome' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Create welcome notification for new users
  const createWelcomeNotification = async (userId: string) => {
    const welcomeNotification: Notification = {
      id: 'welcome',
      type: 'welcome',
      title: 'Welcome to Sportrz!',
      message: 'Welcome to Sportrz! Explore our collection of 500+ games and have fun playing. Don\'t forget to check out our premium plans for an enhanced gaming experience!',
      read: false,
      createdAt: new Date(),
    };

    const userNotificationsRef = doc(db, 'userNotifications', userId);
    await setDoc(userNotificationsRef, {
      notifications: [welcomeNotification],
      updatedAt: new Date(),
    });
  };

  // Check if user is new and create welcome notification
  const checkAndCreateWelcomeNotification = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.hasReceivedWelcomeNotification) {
          await createWelcomeNotification(userId);
          
          // Mark user as having received welcome notification
          await updateDoc(userDocRef, {
            hasReceivedWelcomeNotification: true,
            updatedAt: new Date(),
          });
        }
      }
    } catch (error) {
      console.error('Error checking/creating welcome notification:', error);
    }
  };

  // Load notifications from Firebase
  useEffect(() => {
    if (!currentUser) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Check and create welcome notification for new users
    checkAndCreateWelcomeNotification(currentUser.uid);

    const userNotificationsRef = doc(db, 'userNotifications', currentUser.uid);
    
    const unsubscribe = onSnapshot(userNotificationsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const notificationData = data.notifications || [];
        
        // Convert Firebase timestamps to Date objects
        const processedNotifications = notificationData.map((notification: any) => ({
          ...notification,
          createdAt: notification.createdAt?.toDate() || new Date(),
        }));
        
        setNotifications(processedNotifications);
      } else {
        setNotifications([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading notifications:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const markAsRead = async (notificationId: string) => {
    if (!currentUser) return;

    try {
      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );

      const userNotificationsRef = doc(db, 'userNotifications', currentUser.uid);
      await updateDoc(userNotificationsRef, {
        notifications: updatedNotifications,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!currentUser) return;

    try {
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        read: true,
      }));

      const userNotificationsRef = doc(db, 'userNotifications', currentUser.uid);
      await updateDoc(userNotificationsRef, {
        notifications: updatedNotifications,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        loading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};