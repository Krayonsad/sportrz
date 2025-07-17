// src/contexts/AuthContext.tsx
'use client';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from './ToastContext';

// Add this to the AuthContextType interface
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Check if email is verified
    if (!user.emailVerified) {
      await signOut(auth); // Sign out unverified user
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
    }
    
    // Show success toast with user's name or email
    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    showToast(`Welcome back, ${displayName}!`, 'success', 4000);
    
  } catch (error) {
    // Re-throw error to be handled by the login component
    throw error;
  }
};

const signup = async (email: string, password: string, displayName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's profile with display name
    await updateProfile(result.user, {
      displayName: displayName
    });
    
    // Send verification email
    await sendEmailVerification(result.user);
    
    // Sign out the user immediately after signup - THIS IS THE KEY CHANGE
    await signOut(auth);
    
    // Show success toast
    showToast(`Account created! Please check your email to verify your account.`, 'success', 6000);
    
  } catch (error) {
    // Re-throw error to be handled by the signup component
    throw error;
  }
};

  const logout = async () => {
  try {
    const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
    
    await signOut(auth);
    
    // Redirect to home page after logout
    router.push('/');
    
    // Show success toast after logout
    showToast(`Goodbye, ${userName}! You've been signed out successfully.`, 'success', 4000);
    
  } catch (error) {
    console.error('Error signing out:', error);
    showToast('Failed to sign out. Please try again.', 'error', 4000);
    throw error;
  }
};

  const resendVerificationEmail = async () => {
  try {
    // We need to temporarily sign in to get the user object
    if (!currentUser) {
      throw new Error('No user found. Please sign up first.');
    }
    
    await sendEmailVerification(currentUser);
    showToast('Verification email sent! Please check your inbox.', 'success', 4000);
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

  // Add this function inside the AuthProvider component
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    showToast(`Welcome, ${displayName}!`, 'success', 4000);
    
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    showToast('Password reset email sent! Please check your inbox.', 'success', 6000);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

const value: AuthContextType = {
  currentUser,
  loading,
  login,
  loginWithGoogle,
  signup,
  logout,
  resendVerificationEmail,
  resetPassword // Add this line
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}