"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "The Future of AI in Decentralized Finance",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing the DeFi landscape and creating new opportunities for automated trading and risk management.",
    image: "/placeholder.svg?height=300&width=600",
    date: "Apr 15, 2023",
    readTime: "8 min read",
    category: "DeFi",
  },
  {
    title: "Building Neural Networks for Crypto Price Prediction",
    excerpt:
      "A technical deep dive into creating and training neural networks that can predict cryptocurrency price movements with increasing accuracy.",
    image: "/placeholder.svg?height=300&width=600",
    date: "Mar 22, 2023",
    readTime: "12 min read",
    category: "Machine Learning",
  },
  {
    title: "Smart Contract Security: Best Practices",
    excerpt:
      "Essential security considerations and patterns for developing robust, secure smart contracts on Ethereum and other blockchain platforms.",
    image: "/placeholder.svg?height=300&width=600",
    date: "Feb 10, 2023",
    readTime: "10 min read",
    category: "Blockchain",
  },
];

export default function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="blog" className="py-20 relative crypto-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="animated-gradient-text">Blog & Pemikiran</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Kumpulan pemikiran, opini, dan wawasan saya seputar perkembangan
            teknologi terkini—mulai dari AI, blockchain, hingga refleksi pribadi
            tentang masa depan digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="futuristic-border glass-card h-full overflow-hidden">
                <div className="relative overflow-hidden h-48">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10"></div>
                  <Badge className="absolute top-4 left-4 z-20 bg-primary text-white">
                    {post.category}
                  </Badge>
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300">{post.excerpt}</p>
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      className="text-primary hover:bg-primary/10 p-0"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="neon-button bg-primary hover:bg-primary/80 text-white">
            Lihat Semua
          </Button>
        </div>
      </div>
    </section>
  );
}
