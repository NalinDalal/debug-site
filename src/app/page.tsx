"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const { user, isAdmin } = useAuth();

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center p-8 min-h-screen text-white bg-gray-900">
        {/* Hero Section */}
        <section className="py-12 w-full text-center bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Debug</h1>
          <p className="mb-6 text-lg text-gray-400">
            Connect, collaborate, and grow with our community. Explore events,
            courses, and more!
          </p>
          {!user && (
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          )}
        </section>

        {/* Features Section */}
        <section className="container py-12 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Personalized Profile",
                description:
                  "Get recommendations tailored to your interests and academic goals.",
              },
              {
                title: "Event Management",
                description:
                  "Register for events and stay updated with the latest activities.",
              },
              {
                title: "Notes Sharing",
                description:
                  "Access study notes shared by peers or upload your own.",
              },
              {
                title: "Admin Dashboard",
                description:
                  "Admins can manage events, users, and platform content easily.",
              },
              {
                title: "Certification Tracking",
                description:
                  "Keep track of your certifications and achievements in one place.",
              },
              {
                title: "Community Interaction",
                description:
                  "Collaborate with peers through forums, chats, and discussions.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-gray-800 shadow-md transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Logged-In User Section */}
        {user && (
          <section className="mx-auto mb-12 w-full max-w-xl">
            <Card className="w-full bg-gray-800">
              <CardHeader>
                <CardTitle>Personalized Suggestions</CardTitle>
                <CardDescription>
                  We've got some great recommendations for you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Check out your profile to see personalized suggestions for:
                </p>
                <ul className="pl-5 mb-4 list-disc">
                  <li>Courses</li>
                  <li>Certifications</li>
                  <li>Study Notes</li>
                  <li>Upcoming Events</li>
                </ul>
                <Link href="/profile">
                  <Button>View Suggestions</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Social Links Section */}
        <section className="py-8 w-full text-center text-white bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold">Follow Us</h2>
          <p className="mb-6 text-gray-400">
            Stay updated with the latest news and events from our community.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
