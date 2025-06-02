"use client";

import { AuthProvider } from "@/contexts/auth-context";
import AuthenticatedSidebarMenu from "@/components/ui/AuthenticatedSidebarMenu";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div className="flex h-screen">
        <AuthenticatedSidebarMenu />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </AuthProvider>
  );
}
