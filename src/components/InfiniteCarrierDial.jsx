// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
// import { logos } from '@/const/logos';
// import Image from 'next/image';

// const ITEM_HEIGHT = 140; // Each logo block height

// const InfiniteCarrierDial = () => {
//   const baseY = useMotionValue(0);
//   const velocity = useRef(0);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     lastScrollY.current = window.scrollY;

//     const onScroll = () => {
//       const diff = window.scrollY - lastScrollY.current;
//       velocity.current = diff;
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useAnimationFrame(() => {
//     const v = velocity.current * 0.1;
//     const nextY = baseY.get() + v;
//     const totalHeight = logos.length * ITEM_HEIGHT;
//     baseY.set(((nextY % totalHeight) + totalHeight) % totalHeight); // wrap safely
//   });

//   const repeatedLogos = [...logos, ...logos, ...logos]; // Triple for smoother wrap
//   const containerHeight = ITEM_HEIGHT * 5; // Adjust height for visible logos

//   return (
//     <div className="h-[700px] w-[40vw] overflow-hidden relative">
//       <motion.div
//         style={{ y: baseY }}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//       >
//         {repeatedLogos.map((logo, index) => {
//           const yOffset = index * ITEM_HEIGHT - repeatedLogos.length * ITEM_HEIGHT * 0.5 + baseY.get();
//           const distanceFromCenter = Math.abs(yOffset);
//           const isCenter = distanceFromCenter < ITEM_HEIGHT / 2;

//           // D-curve effect: translateX grows as it gets closer to center
//           const x = -Math.cos((yOffset / containerHeight) * Math.PI) * 150;
//           const scale = isCenter ? 2.2 : 1.5 - Math.min(distanceFromCenter / 1000, 0.3);
//           const textSize = isCenter ? 'text-lg' : 'text-sm';
//           const opacity = isCenter ? 1 : 0.4;

//           return (
//             <motion.div
//               key={index}
//               style={{ y: yOffset, x, scale, opacity }}
//               className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-300 ${
//                 isCenter ? 'drop-shadow-xl brightness-125 z-10' : ''
//               }`}
//             >
//               <Image
//                 src={logo.src}
//                 alt={logo.name}
//                 width={64}
//                 height={64}
//                 className={`object-contain rounded-full p-2 bg-white shadow-xl`}
//               />
//               <span className={`text-sm font-semibold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent ${textSize}`}>{logo.name}</span>
//             </motion.div>
//           );
//         })}
//       </motion.div>
//     </div>
//   );
// };

// export default InfiniteCarrierDial;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { logos } from '@/const/logos';
import Image from 'next/image';

const ITEM_HEIGHT = 140;

const InfiniteCarrierDial = () => {
  const containerRef = useRef(null);
  const baseY = useMotionValue(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;

    const onScroll = () => {
      const diff = container.scrollTop - lastScrollTop;
      lastScrollTop = container.scrollTop;
      baseY.set(baseY.get() + diff );
      setCurrentY(baseY.get());
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const repeatedLogos = [...logos, ...logos, ...logos];
  const containerHeight = ITEM_HEIGHT * 5;
  const totalHeight = repeatedLogos.length * ITEM_HEIGHT;

  return (
    <div className="relative h-[600px] w-[40vw] overflow-hidden">
    <div ref={containerRef} className="h-full overflow-y-scroll no-scrollbar">
      <div style={{ height: totalHeight }} />
      <motion.div
        style={{ y: baseY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {repeatedLogos.map((logo, index) => {
          let yOffset = index * ITEM_HEIGHT - currentY;
          if (yOffset < -totalHeight / 2) yOffset += totalHeight;
          if (yOffset > totalHeight / 2) yOffset -= totalHeight;

          const distanceFromCenter = Math.abs(yOffset);
          const isCenter = distanceFromCenter < ITEM_HEIGHT / 2;

          const x = -Math.cos((yOffset / containerHeight) * Math.PI) * 150;
          const scale = isCenter ? 2.2 : 1.5 - Math.min(distanceFromCenter / 1000, 0.3);
          const textSize = isCenter ? 'text-lg' : 'text-sm';
          const opacity = isCenter ? 1 : 0.4;

          return (
            <motion.div
              key={index}
              style={{ y: yOffset, x, scale, opacity }}
              className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-300 ${
                isCenter ? 'drop-shadow-xl brightness-125 z-10' : ''
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={64}
                height={64}
                className="object-contain rounded-full p-2 bg-white shadow-xl"
              />
              <span className={`font-semibold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent ${textSize}`}>
                {logo.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
    </div>
  );
};

export default InfiniteCarrierDial;

