import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="#hero" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold tracking-tight animated-gradient-text">
              QUIXIQ
            </span>
          </Link>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="#hero"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#blog"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © {currentYear} QUIXIQ. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
