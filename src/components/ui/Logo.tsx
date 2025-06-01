import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "small" | "medium" | "large" | "xlarge" | "2xlarge";
}

export default function Logo({ className = "", showText = true, size = "small" }: LogoProps) {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-48 h-48", // Increased from w-32 h-32 to w-48 h-48
    large: "w-48 h-48",
    xlarge: "w-64 h-64",
    "2xlarge": "w-96 h-96"
  };

  return (
    <Link href="/" className={`flex flex-col items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src="https://i.imgur.com/1U0mIzE.png"
          alt="Studiyo Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="text-center mt-2">
          <h1 className="text-2xl font-bold text-gray-900">Studiyo</h1>
          <p className="text-sm text-gray-600">Learn. Talk. Play</p>
        </div>
      )}
    </Link>
  );
}
