// components/Header.tsx
import Link from "next/link";

export const Header = () => (
  <header className="p-4 text-white bg-gray-800">
    <nav className="flex justify-between items-center">
      <div className="text-xl font-semibold">
        <Link href="/">College Community</Link>
      </div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-400">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-400">
          Contact
        </Link>
      </div>
    </nav>
  </header>
);
