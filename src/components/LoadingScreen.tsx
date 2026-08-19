'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MESSAGES = [
  'Reading your answers',
  'Mapping your pattern',
  'Building your result',
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-[var(--muted)]"
      >
        {MESSAGES[index]}
      </motion.p>
    </main>
  );
}
