"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LightbulbIcon, CodeIcon, UsersIcon } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="animated-gradient-text">About Me</span>
          </h2>
          {/* Modern horizontal divider with dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-1 w-10 bg-primary rounded-full"></div>
            <div className="h-2 w-2 bg-secondary rounded-full"></div>
            <div className="h-1 w-20 bg-linear-to-r from-primary to-secondary rounded-full"></div>
            <div className="h-2 w-2 bg-accent rounded-full"></div>
            <div className="h-1 w-10 bg-accent rounded-full"></div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="backdrop-blur-xs bg-black/30 border border-white/10 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Top section with gradient border */}
            <div className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 p-0.5">
              <div className="bg-black/80 p-8 md:p-12">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col md:flex-row gap-10 items-center mb-10"
                >
                  {/* Profile image with blob shape */}
                  <div className="w-40 h-40 md:w-52 md:h-52 relative shrink-0">
                    <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent rounded-full blur-xs"></div>
                    <div className="absolute inset-1 bg-gray-900 rounded-full overflow-hidden">
                      {/* Replace with your image */}
                      <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-700 flex items-center justify-center text-white text-4xl font-bold">
                        AI
                      </div>
                    </div>
                  </div>

                  <div className="text-left">
                    <motion.p
                      variants={itemVariants}
                      className="text-xl md:text-2xl font-light text-gray-200 leading-relaxed mb-6"
                    >
                      Saya adalah seorang pelajar yang senang mengeksplorasi
                      dunia{" "}
                      <span className="text-primary font-medium">
                        teknologi, sains, dan crypto
                      </span>
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="flex gap-2 flex-wrap"
                    >
                      <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-sm text-primary">
                        Pelajar
                      </span>
                      <span className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-sm text-secondary">
                        Pencinta Ilmu
                      </span>
                      <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-sm text-accent">
                        Eksplorator Teknologi
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    variants={itemVariants}
                    className="text-gray-300 leading-relaxed"
                  >
                    <p className="mb-4">
                      Pengalaman saya adalah belajar berbagai bahasa dan
                      teknologi pemrograman, seperti{" "}
                      <span className="text-white font-medium">
                        PHP, Python, Java, JavaScript, TypeScript, Node.js,
                        React.js, Next.js, Bun.js, Saya juga belajar tentang Network.
                      </span>{" "}
                      Saya senang mengeksplorasi berbagai
                      tools dan framework untuk memahami cara kerja teknologi
                      secara lebih mendalam.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="text-gray-300 leading-relaxed"
                  >
                    <p>
                      Saya percaya bahwa proses belajar yang konsisten dan rasa
                      ingin tahu yang tinggi dapat membuka banyak peluang. Saat
                      ini, saya terus bereksperimen dengan teknologi baru,
                      membangun proyek kecil, dan mencoba memahami bagaimana
                      teknologi bisa berdampak dalam kehidupan sehari-hari
                      maupun masa depan.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats with hover effects */}
            {/* Statistik Aktivitas */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <motion.div
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 text-center border-r border-white/5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4 text-primary">
                    <LightbulbIcon size={24} />
                  </div>
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/70 mb-2">
                    9+
                  </div>
                  <div className="text-gray-400 font-medium">
                    Teknologi Dipelajari
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 text-center border-r border-white/5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 mb-4 text-secondary">
                    <CodeIcon size={24} />
                  </div>
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-secondary to-secondary/70 mb-2">
                    20+
                  </div>
                  <div className="text-gray-400 font-medium">
                    Proyek & Eksperimen Pribadi
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={statVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 mb-4 text-accent">
                    <UsersIcon size={24} />
                  </div>
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-accent to-accent/70 mb-2">
                    Proses
                  </div>
                  <div className="text-gray-400 font-medium">
                    Membangun Startup
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
