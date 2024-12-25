// components/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="text-white bg-gray-800 shadow-sm">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex justify-between items-center py-6 w-full border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Debug</span>
              <img
                className="w-auto h-10"
                src="/placeholder.svg?height=40&width=40"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link
                href="/clubs"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Clubs
              </Link>
              <Link
                href="/events"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Events
              </Link>
              <Link
                href="/notes"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Notes
              </Link>
              <Link
                href="/chat"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Chat Rooms
              </Link>
              <Link
                href="/team"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Our Team
              </Link>
              <Link
                href="/sponsors"
                className="text-base font-medium text-gray-300 hover:text-gray-100"
              >
                Sponsors
              </Link>
              <Link
                href="/codebox"
                className="font-medium text-gray-300 hover:text-gray-100 texxt-base"
              >
                CodeBox
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-base font-medium text-gray-300 hover:text-gray-100"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-base font-medium text-gray-300 hover:text-gray-100"
                  >
                    Admin
                  </Link>
                )}
                <Button
                  onClick={logout}
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
