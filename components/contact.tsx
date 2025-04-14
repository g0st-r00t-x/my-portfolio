"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success message
    alert("Message sent successfully!");
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, url: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, url: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      text: "hello@example.com",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      text: "Schedule a call",
    },
  ];

  return (
    <section id="contact" className="py-20 relative ai-grid">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="animated-gradient-text">Hubungi Saya</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Punya ide proyek atau ingin berkolaborasi? Jangan ragu untuk
            menghubungi saya—siapa tahu kita bisa menciptakan sesuatu yang luar
            biasa bersama.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="futuristic-border glass-card overflow-hidden p-6">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-gray-900/50 border-gray-700 focus:border-primary min-h-[150px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full neon-button bg-primary hover:bg-primary/80 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Kirim
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="futuristic-border glass-card overflow-hidden p-6">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Info Kontak & Kolaborasi
              </h3>

              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="h-10 w-10 rounded-full glass flex items-center justify-center mr-4 futuristic-border">
                      {item.icon}
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <h4 className="text-lg font-bold text-white mb-4">
                Terhubung Lebih Dekat
              </h4>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="h-10 w-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-primary transition-colors futuristic-border"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
