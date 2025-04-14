'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)

    const dotTimer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(dotTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-violet-500 via-blue-500 via-40% via-yellow-400 to-violet-500">
              QUIXIQ
            </h1>
            <p className="mt-4 text-gray-400 font-medium text-sm md:text-base animate-pulse">
              Loading{dots}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
