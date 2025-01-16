"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

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
      { threshold: 0.1 },
    );

    if (mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, [cardControls]);

  return (
    <div className="py-40 w-full bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xl font-bold text-black md:text-4xl dark:text-white">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="py-4 mx-auto max-w-2xl text-sm md:text-lg text-neutral-500">
          Break free from traditional boundaries. Connect to people from your
          alumni, at the comfort of one click away.
        </p>
      </div>
      <motion.div
        ref={mapRef}
        className="transition-opacity duration-500"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <WorldMap
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: 34.0522, lng: -118.2437 },
            },
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: -15.7975, lng: -47.8919 },
            },
            {
              start: { lat: -15.7975, lng: -47.8919 },
              end: { lat: 38.7223, lng: -9.1393 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 28.6139, lng: 77.209 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: 43.1332, lng: 131.9113 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: -1.2921, lng: 36.8219 },
            },
          ]}
        />
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={cardControls}
        transition={{ duration: 0.6 }}
      >
        <CardDemo />
        Hi there; i better hope this fuck works
      </motion.div>
    </div>
  );
}

export function CardDemo() {
  return (
    <div className="w-full max-w-xs group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover",
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-60 transition duration-300 group-hover/card:bg-black"></div>
        <div className="flex z-10 flex-row items-center space-x-4">
          <Image
            height="100"
            width="100"
            alt="Profile picture of Manu Arora"
            src="/manu.png"
            className="object-cover w-10 h-10 rounded-full border-2"
          />
          <div className="flex flex-col">
            <p className="relative z-10 text-base font-normal text-gray-50">
              Manu Arora
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
            Author Card
          </h1>
          <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
            Card with Author avatar, complete name and time to read - most
            suitable for blogs.
          </p>
          <div className="flex relative z-10 items-center space-x-2">
            <a
              href="https://www.linkedin.com/in/manuarora28"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-500 hover:text-blue-300"
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
