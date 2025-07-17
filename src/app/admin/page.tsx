// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/contexts/ToastContext';
import { Shield, Users, Settings, BarChart, Mail, MessageSquare } from 'lucide-react';
import ContactMessages from '@/components/ContactMessages';

type AdminView = 'overview' | 'messages' | 'users' | 'settings' | 'analytics';

export default function AdminPanel() {
  const { currentUser } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const { showToast } = useToast();
  const router = useRouter();
  const [activeView, setActiveView] = useState<AdminView>('overview');

  useEffect(() => {
    if (!loading && !currentUser) {
      showToast('Please log in to access the admin panel', 'error');
      router.push('/login');
      return;
    }

    if (!loading && currentUser && !isAdmin) {
      showToast('Access denied. Admin privileges required.', 'error');
      router.push('/');
      return;
    }
  }, [currentUser, isAdmin, loading, router, showToast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return null;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'messages':
        return <ContactMessages />;
      case 'users':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Management</h2>
            <p className="text-gray-600 dark:text-gray-400">User management features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Application Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Settings management features coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Analytics features coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Messages</h2>
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View and manage contact form submissions
              </p>
              <button 
                onClick={() => setActiveView('messages')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                View Messages
              </button>
            </div>

          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-500" />
                Admin Panel
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage your application settings and user data
              </p>
            </div>
            
            {/* Navigation */}
            {activeView !== 'overview' && (
              <button
                onClick={() => setActiveView('overview')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Overview
              </button>
            )}
          </div>

          {/* Breadcrumb */}
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="capitalize">{activeView}</span>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}