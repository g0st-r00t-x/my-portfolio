"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Brain,
  Code,
  Database,
  Globe,
  Cpu,
  BarChart3,
  Eye,
  MessageSquare,
  Layers,
  Repeat,
  Server,
  Workflow,
  Zap,
  Fingerprint,
  FileCode,
  Blocks,
} from "lucide-react";

const skills = [
  {
    category: "AI & Machine Learning",
    icon: <Brain className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
    items: [
      { name: "TensorFlow / PyTorch", icon: <Cpu size={18} /> },
      {
        name: "Natural Language Processing",
        icon: <MessageSquare size={18} />,
      },
      { name: "Computer Vision", icon: <Eye size={18} /> },
      { name: "Reinforcement Learning", icon: <Repeat size={18} /> },
    ],
  },
  {
    category: "Blockchain & Web3",
    icon: <Database className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500",
    items: [
      { name: "Smart Contracts (Solidity)", icon: <FileCode size={18} /> },
      { name: "DeFi Protocols", icon: <BarChart3 size={18} /> },
      { name: "Web3.js / Ethers.js", icon: <Globe size={18} /> },
      { name: "NFT Development", icon: <Fingerprint size={18} /> },
    ],
  },
  {
    category: "Programming Languages",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "Python", icon: <Zap size={18} /> },
      { name: "JavaScript / TypeScript", icon: <Layers size={18} /> },
      { name: "Solidity", icon: <Blocks size={18} /> },
      { name: "Rust", icon: <Server size={18} /> },
    ],
  },
  {
    category: "Web Development",
    icon: <Globe className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "React / Next.js", icon: <Workflow size={18} /> },
      { name: "Node.js", icon: <Server size={18} /> },
      { name: "Three.js / WebGL", icon: <Cpu size={18} /> },
      { name: "Tailwind CSS", icon: <Layers size={18} /> },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="animated-gradient-text">My Skills</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ringkasan menyeluruh tentang keahlian teknis saya di bidang
            pengembangan web, pemrograman, dan eksplorasi teknologi seperti AI
            dan blockchain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.1 }}
              className="flex flex-col"
            >
              <div className="futuristic-border glass-card h-full p-6 flex-1 flex flex-col">
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-br ${skillGroup.color} flex items-center justify-center mb-4`}
                >
                  {skillGroup.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 text-white">
                  {skillGroup.category}
                </h3>

                <div className="grid grid-cols-1 gap-3 mt-2 flex-1">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + skillIndex * 0.1,
                      }}
                      className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="mr-3 text-primary">{skill.icon}</div>
                      <span className="text-gray-200">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
