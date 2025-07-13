"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function InstructorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signIn(email, password);
      if (userCredential === undefined) {
        setError("User not found after sign in.");
        return;
      }
      const user = (userCredential as any).user;
      const idTokenResult = await user.getIdTokenResult(true); // force refresh token
      const claims = idTokenResult.claims;
      console.log("ID Token Claims:", claims);
      if (claims.instructor === true) {
        // Update auth-token cookie with fresh token containing claims
        const freshToken = await user.getIdToken(true);
        document.cookie = `auth-token=${freshToken}; path=/; secure; samesite=strict`;
        router.push("/instructor");
      } else {
        setError("You are not authorized as an instructor.");
        await signOut(auth);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to sign in");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col items-center space-y-16">
        <div className="flex flex-col items-center justify-center text-center">
          <Logo size="2xlarge" showText={false} />
          <h2 className="mt-12 text-3xl font-bold text-gray-900">
            Instructor Sign in
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Or{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              create a new account
            </Link>
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Are you a student?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
