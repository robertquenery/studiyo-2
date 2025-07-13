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
  getIdTokenResult,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createTestUser } from "@/lib/test-auth";
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  claims: Record<string, any> | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged user:", user);
      setUser(user);
      setIsLoading(false);

      if (user) {
        try {
          const idTokenResult = await getIdTokenResult(user, true);
          setClaims(idTokenResult.claims);
          // Get the ID token and store it in a session cookie (no expiration)
          const token = idTokenResult.token;
          console.log("Setting auth-token cookie");
          Cookies.set('auth-token', token, { sameSite: 'strict', secure: true }); // Set secure and sameSite flags, unified cookie name
        } catch (error) {
          console.error("Failed to get ID token result:", error);
          setClaims(null);
        }
      } else {
        console.log("Removing auth-token cookie");
        // Remove the token when user is not authenticated
        Cookies.remove('auth-token');
        setClaims(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Remove automatic redirect here, let caller handle it
      return userCredential;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to sign in");
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to sign up");
      }
    }
  };

  // Set Firebase auth persistence to session to avoid persistent login after tab close or refresh
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).catch((error) => {
      console.error("Failed to set auth persistence:", error);
    });
  }, []);

  const logout = async () => {
    try {
      console.log("Logging out user");
      await signOut(auth);
      // Wait for onAuthStateChanged to confirm user is null before redirecting
      const waitForSignOut = new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            unsubscribe();
            resolve();
          }
        });
      });
      await waitForSignOut;
      // Add a short delay to ensure Firebase auth state is fully cleared
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Clearing cookies and storage on logout");
      Cookies.remove('auth-token');
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to log out");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, claims, isLoading, signIn, signUp, logout }}>
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
