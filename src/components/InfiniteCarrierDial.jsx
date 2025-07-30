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

// 'use client';
// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { logos } from '@/const/logos'; // Must be 8 logos max
// import Image from 'next/image';

// const ITEM_HEIGHT = 110;
// const VISIBLE_COUNT = 5;


// const InfiniteCarrierDial = () => {
//   const containerRef = useRef(null);
//   const [scrollTop, setScrollTop] = useState(0);

//   // Repeat logos for infinite effect
//   const repeatedLogos = [...logos];
//   const totalHeight = repeatedLogos.length * ITEM_HEIGHT;

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       setScrollTop(container.scrollTop);
//     };

//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, []);

//   const getLogoY = (index) => index * ITEM_HEIGHT - scrollTop;

//   return (
//     <div className="relative h-[600px] w-[40vw] overflow-hidden">
//       <div ref={containerRef} className="h-full overflow-y-scroll no-scrollbar">
//         <div style={{ height: totalHeight }} />
//         <motion.div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         >
//           {repeatedLogos.map((logo, i) => {
//             let y = getLogoY(i);
//             if (y < -totalHeight / 2) y += totalHeight;
//             if (y > totalHeight / 2) y -= totalHeight;

//             const distance = Math.abs(y);
//             if (distance > ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2)) return null;

//             const isCenter = distance < ITEM_HEIGHT / 2;
//             const scale = isCenter ? 2.2 : 1.2;
//             const opacity = isCenter ? 1 : 0.4;
//             const x = -Math.cos((y / (ITEM_HEIGHT * VISIBLE_COUNT)) * Math.PI) * 150;
//             const textSize = isCenter ? 'text-[.5vw]' : 'text-sm';

//             return (
//               <motion.div
//                 key={i}
//                 style={{ y, x, scale, opacity }}
//                 className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-3 transition-all duration-300 ${
//                   isCenter ? 'drop-shadow-xl brightness-125 z-10' : ''
//                 }`}
//               >
//                 <Image
//                   src={logo.src}
//                   alt={logo.name}
//                   width={64}
//                   height={64}
//                   className="object-contain rounded-full p-2 bg-white shadow-xl"
//                 />
//                 <span
//                   className={`font-semibold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent ${textSize}`}
//                 >
//                   {logo.name}
//                 </span>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default InfiniteCarrierDial;

'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logos from '@/const/logos';

const ITEM_HEIGHT = 110;
const VISIBLE_COUNT = 5;

const InfiniteCarrierDial = () => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const repeatedLogos = [...logos];
  const totalHeight = repeatedLogos.length * ITEM_HEIGHT;
  const midScroll = totalHeight / 3;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = midScroll;
      setScrollTop(midScroll);
    });

    const handleScroll = () => {
      const current = container.scrollTop;
      if (current < totalHeight / 6 || current > totalHeight - totalHeight / 6) {
        container.scrollTop = midScroll;
        setScrollTop(midScroll);
      } else {
        setScrollTop(current);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalHeight]);

  const getLogoY = (index) => index * ITEM_HEIGHT - scrollTop;

  return (
    <div className="relative h-[600px] w-[40vw] overflow-hidden">
      <div ref={containerRef} className="h-full overflow-y-scroll no-scrollbar">
        <div style={{ height: `${totalHeight}px` }} className="relative">
          {repeatedLogos.map((logo, i) => {
            let y = getLogoY(i);
            const half = totalHeight / 2;
            if (y < -half) y += totalHeight;
            if (y > half) y -= totalHeight;

            const distance = Math.abs(y);
            const isCenter = distance < ITEM_HEIGHT / 2;
            const threshold = ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2);
            if (distance > threshold) return null;

            const scale = isCenter ? 2.2 : 1.2;
            const opacity = isCenter ? 1 : 0.4;
            const x = -Math.cos((y / (ITEM_HEIGHT * VISIBLE_COUNT)) * Math.PI) * 130;
            const textSize = isCenter ? 'text-[.5vw]' : 'text-sm';

            return (
              <motion.div
                key={i}
                style={{
                  // top: `${y}px`,
                  top: `${i * 170}px`,
                  left: '50%',
                  transform: `translateX(${x}px) scale(${scale})`,
                  opacity,
                  position: 'absolute',
                }}
                className={`-translate-x-1/2 flex items-center gap-3 transition-all duration-300 ${
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
                <span
                  className={`font-semibold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent ${textSize}`}
                >
                  {logo.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarrierDial;

