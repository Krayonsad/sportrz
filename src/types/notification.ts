// src/types/notification.ts
export interface Notification {
  id: string;
  userId: string;
  type: 'welcome' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  createNotification: (notification: Omit<Notification, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}