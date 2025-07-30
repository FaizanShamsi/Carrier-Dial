'use client';
import React, { 
  useRef, 
  useEffect, 
  useState 
} from 'react';
import { logos } from '@/const/logos';
import Image from 'next/image';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useMotionValueEvent 
} from 'framer-motion';


const ITEM_HEIGHT = 110;
const VISIBLE_COUNT = 5;

const InfiniteCarrierDial = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);
  const rawScroll = useMotionValue(0);
  const smoothScroll = useSpring(rawScroll, { stiffness: 100, damping: 20 });

  const repeatedLogos = [...logos, ...logos, ...logos];
  const totalHeight = repeatedLogos.length * ITEM_HEIGHT;

  useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;
  const handleScroll = () => {
    rawScroll.set(container.scrollTop); 
  };
  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useMotionValueEvent(smoothScroll, 'change', (v) => {
  setScrollTop(v);
});

  const renderVisibleLogos = () => {
    const centerIndex = Math.floor(smoothScroll.get() / ITEM_HEIGHT);
    const half = Math.floor(VISIBLE_COUNT / 2);
    const visible = [];

    for (let i = -half; i <= half; i++) {
      const index = (centerIndex + i + repeatedLogos.length) % repeatedLogos.length;
      const logo = repeatedLogos[index];

      const y = i * ITEM_HEIGHT;
      const isCenter = i === 0;
      const scale = isCenter ? 2.6 : 1.2;
      const opacity = isCenter ? 1 : 0.7;
      const x = -Math.cos((y / (ITEM_HEIGHT * VISIBLE_COUNT)) * Math.PI) * 150;
      const textSize = isCenter ? 'text-[.5vw]' : 'text-sm';

      visible.push(
        <motion.div
          key={`${logo.name}-${i}`}
          style={{ y, x, scale, opacity }}
          className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-3 ${
            isCenter ? 'drop-shadow-md brightness-125 z-10' : ''
          }`}
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={68}
            height={68}
            className="object-contain rounded-full p-1 bg-white "
          />
          <span
            className={`font-semibold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent ${textSize}`}
          >
            {logo.name}
          </span>
        </motion.div>
      );
    }

    return visible;
  };

  return (
    <div className="relative h-[600px] w-[40vw] overflow-hidden">
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll no-scrollbar"
      >
        <div style={{ height: totalHeight }} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {renderVisibleLogos()}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteCarrierDial;

