"use client";

import { AuthProvider } from "@/contexts/auth-context";
import AuthenticatedSidebarMenu from "@/components/ui/AuthenticatedSidebarMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <AuthenticatedSidebarMenu />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
