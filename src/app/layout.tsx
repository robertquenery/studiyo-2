import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studiyo",
  description: "Studiyo - Learn. Talk. Play",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
