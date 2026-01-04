'use client';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
}
