'use client';
import dynamic from 'next/dynamic';

const InfiniteCarrierDial = dynamic(() => import('@/components/InfiniteCarrierDial'), { ssr: false });

export default function HomeClient() {
  return <InfiniteCarrierDial />;
}
