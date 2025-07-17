// src/contexts/SubscriptionContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionData {
  plan: string;
  startDate: string;
  endDate: string;
  paymentId?: string;
  orderId?: string;
  isActive: boolean;
  autoRenew: boolean;
}

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionPlan: string | null;
  subscriptionData: SubscriptionData | null;
  isExpired: boolean;
  daysRemaining: number;
  setSubscription: (plan: string, paymentData?: any, isAnnual?: boolean) => void;
  clearSubscription: () => void;
  checkSubscriptionValidity: () => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  // Check subscription validity
  const checkSubscriptionValidity = (): boolean => {
    if (!subscriptionData) return false;
    
    const now = new Date();
    const endDate = new Date(subscriptionData.endDate);
    
    const isValid = now < endDate && subscriptionData.isActive;
    const remaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    
    setIsExpired(!isValid);
    setDaysRemaining(remaining);
    
    if (!isValid && subscriptionData.isActive) {
      // Subscription has expired, deactivate it
      const expiredData = { ...subscriptionData, isActive: false };
      setSubscriptionData(expiredData);
      setIsSubscribed(false);
      
      // Update localStorage
      const savedData = {
        ...expiredData,
        timestamp: Date.now(),
        checksum: btoa(expiredData.plan + expiredData.endDate + 'sportrz_sub_security')
      };
      localStorage.setItem('sportrz_subscription', JSON.stringify(savedData));
    }
    
    return isValid;
  };

  // Load subscription state from localStorage on mount
  useEffect(() => {
    const savedSubscription = localStorage.getItem('sportrz_subscription');
    if (savedSubscription) {
      try {
        const data = JSON.parse(savedSubscription);
        
        // Verify checksum to prevent tampering
        const expectedChecksum = btoa(data.plan + data.endDate + 'sportrz_sub_security');
        if (data.checksum !== expectedChecksum) {
          localStorage.removeItem('sportrz_subscription');
          return;
        }
        
        setSubscriptionData(data);
        setSubscriptionPlan(data.plan);
        
        // Check if subscription is still valid
        const now = new Date();
        const endDate = new Date(data.endDate);
        const isValid = now < endDate && data.isActive;
        
        setIsSubscribed(isValid);
        setIsExpired(!isValid);
        setDaysRemaining(Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))));
        
      } catch (error) {
        console.error('Error loading subscription data:', error);
        localStorage.removeItem('sportrz_subscription');
      }
    }
  }, []);

  // Check subscription validity every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (subscriptionData) {
        checkSubscriptionValidity();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [subscriptionData]);

  // Check validity when component mounts and subscription data changes
  useEffect(() => {
    if (subscriptionData) {
      checkSubscriptionValidity();
    }
  }, [subscriptionData]);

  const setSubscription = (plan: string, paymentData?: any, isAnnual: boolean = false) => {
    const now = new Date();
    const endDate = new Date();
    
    // Calculate end date based on plan type
    if (isAnnual) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }
    
    const newSubscriptionData: SubscriptionData = {
      plan,
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      paymentId: paymentData?.razorpay_payment_id,
      orderId: paymentData?.razorpay_order_id,
      isActive: true,
      autoRenew: false, // You can implement auto-renew logic later
    };
    
    setIsSubscribed(true);
    setSubscriptionPlan(plan);
    setSubscriptionData(newSubscriptionData);
    setIsExpired(false);
    setDaysRemaining(isAnnual ? 365 : 30);
    
    // Save to localStorage with anti-tampering measures
    const savedData = {
      ...newSubscriptionData,
      timestamp: Date.now(),
      checksum: btoa(plan + endDate.toISOString() + 'sportrz_sub_security')
    };
    localStorage.setItem('sportrz_subscription', JSON.stringify(savedData));
  };

  const clearSubscription = () => {
    setIsSubscribed(false);
    setSubscriptionPlan(null);
    setSubscriptionData(null);
    setIsExpired(false);
    setDaysRemaining(0);
    localStorage.removeItem('sportrz_subscription');
  };

  return (
    <SubscriptionContext.Provider value={{
      isSubscribed,
      subscriptionPlan,
      subscriptionData,
      isExpired,
      daysRemaining,
      setSubscription,
      clearSubscription,
      checkSubscriptionValidity
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}