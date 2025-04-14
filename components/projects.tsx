"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Cpu,
  Bitcoin,
  Code,
  BarChart,
} from "lucide-react";

const projects = [
  {
    title: "AI Trading Bot",
    description:
      "Machine learning algorithm that predicts cryptocurrency price movements and executes trades automatically.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "Binance API", "Docker"],
    links: {
      demo: "#",
      github: "#",
    },
    icon: <Cpu className="h-10 w-10 text-primary" />,
    category: "ai",
  },
  {
    title: "DeFi Yield Optimizer",
    description:
      "Smart contract system that automatically moves funds between DeFi protocols to maximize yield returns.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Solidity", "Web3.js", "React", "Ethereum"],
    links: {
      demo: "#",
      github: "#",
    },
    icon: <BarChart className="h-10 w-10 text-primary" />,
    category: "blockchain",
  },
  {
    title: "NFT Marketplace",
    description:
      "Decentralized platform for creating, buying, and selling NFTs with AI-generated artwork capabilities.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "IPFS", "Solidity", "Stable Diffusion"],
    links: {
      demo: "#",
      github: "#",
    },
    icon: <Bitcoin className="h-10 w-10 text-primary" />,
    category: "blockchain",
  },
  {
    title: "Sentiment Analysis for Crypto",
    description:
      "NLP model that analyzes social media and news to predict market sentiment for cryptocurrencies.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "BERT", "Twitter API", "Flask"],
    links: {
      demo: "#",
      github: "#",
    },
    icon: <Code className="h-10 w-10 text-primary" />,
    category: "ai",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="animated-gradient-text">Proyek Unggulan</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Proyek-proyek yang saya kembangkan—sebagai bentuk
            eksperimen, pembelajaran, dan eksplorasi teknologi seperti AI,
            blockchain, dan web development.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-primary hover:bg-primary/80"
                  : "border-primary text-primary hover:bg-primary/10"
              }
            >
              All Projects
            </Button>
            <Button
              variant={filter === "ai" ? "default" : "outline"}
              onClick={() => setFilter("ai")}
              className={
                filter === "ai"
                  ? "bg-primary hover:bg-primary/80"
                  : "border-primary text-primary hover:bg-primary/10"
              }
            >
              AI Projects
            </Button>
            <Button
              variant={filter === "blockchain" ? "default" : "outline"}
              onClick={() => setFilter("blockchain")}
              className={
                filter === "blockchain"
                  ? "bg-primary hover:bg-primary/80"
                  : "border-primary text-primary hover:bg-primary/10"
              }
            >
              Blockchain Projects
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
  inView: boolean;
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="group"
    >
      <div
        ref={cardRef}
        className="futuristic-border glass-card h-full transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative overflow-hidden h-48 rounded-t-[15px]">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10"></div>
          <div className="absolute top-4 left-4 z-20 glass p-2 rounded-full">
            {project.icon}
          </div>
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string, i: number) => (
              <Badge
                key={i}
                variant="outline"
                className="border-primary/50 text-primary bg-primary/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/60"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/80 text-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
