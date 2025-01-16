"use client";

import { WorldMap } from "@/components/ui/world-map";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function WorldMapDemo() {
    const mapRef = useRef(null);
    const cardControls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cardControls.start({ opacity: 1, y: 0 });
                } else {
                    cardControls.start({ opacity: 0, y: 50 });
                }
            },
            { threshold: 0.2 }
        );

        if (mapRef.current) observer.observe(mapRef.current);

        return () => observer.disconnect();
    }, [cardControls]);

    return (
        <div className="py-20 px-4 w-full bg-white dark:bg-black">
            {/* Title Section */}
            <div className="mx-auto max-w-6xl text-center">
                <h1 className="text-2xl font-bold text-black md:text-4xl dark:text-white">
                    Remote{" "}
                    <span className="text-neutral-400">
            {"Connectivity".split("").map((letter, idx) => (
                <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                    {letter}
                </motion.span>
            ))}
          </span>
                </h1>
                <p className="mt-4 mx-auto max-w-2xl text-sm md:text-lg text-neutral-500">
                    Break free from traditional boundaries. Connect with people from your
                    alumni, all at the comfort of one click.
                </p>
            </div>

            {/* World Map */}
            <motion.div
                ref={mapRef}
                className="mt-10 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <WorldMap
                    dots={[
                        { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
                        { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
                        { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
                        { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
                        { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
                        { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
                    ]}
                />
            </motion.div>

            {/* Card Section */}
            <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 50 }}
                animate={cardControls}
                transition={{ duration: 0.6 }}
            >
                <CardDemo />
            </motion.div>
        </div>
    );
}

export function CardDemo() {
    return (
        <div className="w-full max-w-xs mx-auto group/card">
            <div
                className={cn(
                    "cursor-pointer overflow-hidden relative card h-96 rounded-lg shadow-lg mx-auto flex flex-col justify-between p-6 bg-cover",
                    "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)]"
                )}
            >
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 transition-opacity duration-300 group-hover/card:opacity-70"></div>

                {/* Card Header */}
                <div className="relative z-10 flex items-center space-x-4">
                    <Image
                        height="40"
                        width="40"
                        alt="Profile picture of Manu Arora"
                        src="/images/team/nalin.jpg"
                        className="object-cover w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                        <p className="text-base font-semibold text-white">Manu Arora</p>
                        <p className="text-sm text-gray-300">2 min read</p>
                    </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 mt-auto">
                    <h2 className="text-lg font-bold text-white md:text-xl">
                        Author Card
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        A card with an author avatar, name, and time to read – ideal for
                        blogs.
                    </p>
                    <div className="mt-4">
                        <a
                            href="https://www.linkedin.com/in/manuarora28"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-500 hover:text-blue-400"
                            aria-label="Visit Manu Arora's LinkedIn profile"
                        >
                            <FaLinkedin size={18} />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
