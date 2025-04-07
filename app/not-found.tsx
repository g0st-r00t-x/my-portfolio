// app/not-found.tsx

"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-violet-500 via-40% via-yellow-400 to-violet-500 text-transparent bg-clip-text animate-gradient"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-300 text-lg md:text-2xl mt-4 mb-6"
      >
        Oops! Halaman yang kamu cari tidak ditemukan.
      </motion.p>

      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Kembali ke Beranda
        </motion.button>
      </Link>
    </div>
  )
}
