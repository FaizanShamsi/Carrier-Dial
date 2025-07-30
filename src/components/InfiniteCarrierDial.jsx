'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { logos } from '@/const/logos';

const InfiniteCarrierDial = () => {
  const baseY = useMotionValue(0);
  const velocity = useRef(0);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      const diff = window.scrollY - lastScrollY.current;
      velocity.current = diff;
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useAnimationFrame((t, delta) => {
    const v = velocity.current * 0.05; // Adjust scroll sensitivity
    baseY.set(baseY.get() + v);

    // Wrap the list (infinite loop)
    if (baseY.get() > 100) baseY.set(-100);
    if (baseY.get() < -100) baseY.set(100);
  });

  return (
    <div className="h-[400px] overflow-hidden relative">
      <motion.div style={{ y: baseY }} className="flex flex-col items-center gap-8">
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex items-center gap-4">
            <Image
              src={logo.src}
              alt={logo.name}
              className="w-16 h-16 rounded-full shadow-md"
            />
            <span className="text-lg font-semibold text-purple-600">{logo.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarrierDial;
