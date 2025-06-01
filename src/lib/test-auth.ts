import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "testpass123";

export const createTestUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    return userCredential.user;
  } catch (error) {
    const err = error as { code?: string };
    if (err.code === 'auth/email-already-in-use') {
      // If user exists, just sign in
      const userCredential = await signInWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
      return userCredential.user;
    }
    throw error;
  }
};

export const signInTestUser = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, TEST_EMAIL, TEST_PASSWORD);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in test user:", error);
    throw error;
  }
};
