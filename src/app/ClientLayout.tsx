"use client";

import { AuthProvider } from "@/contexts/auth-context";
import AuthenticatedSidebarMenu from "@/components/ui/AuthenticatedSidebarMenu";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { DarkModeProvider, useDarkMode } from "@/contexts/dark-mode-context";
import Footer from "@/components/ui/Footer";

function DarkModeWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useDarkMode();
  return (
    <motion.div
      key={darkMode ? "dark" : "light"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? "dark" : ""} flex h-screen transition-colors duration-500`}
    >
      {children}
    </motion.div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <DarkModeProvider>
        <DarkModeWrapper>
          <AuthenticatedSidebarMenu />

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 flex flex-col min-h-screen">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ flexGrow: 1 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
            <Footer />
          </main>
        </DarkModeWrapper>
      </DarkModeProvider>
    </AuthProvider>
  );
}
