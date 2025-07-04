import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Studiyo. All rights reserved.
        </div>
        <nav className="flex space-x-6">
          <Link href="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/terms-of-use" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
