"use client";


import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import BackgroundAnimation from "@/components/background-animation";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Blog />
            <Contact />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
