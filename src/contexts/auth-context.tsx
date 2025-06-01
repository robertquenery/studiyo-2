"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createTestUser } from "@/lib/test-auth";
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        // Get the ID token and store it in a cookie
        const token = await getIdToken(user);
        Cookies.set('auth-token', token, { expires: 7 }); // Expires in 7 days
      } else {
        // Remove the token when user is not authenticated
        Cookies.remove('auth-token');
        
        // Auto-sign in test user in development
        if (process.env.NODE_ENV === 'development') {
          try {
            await createTestUser();
          } catch (error) {
            console.error("Error creating test user:", error);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('auth-token');
      router.push("/login");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
