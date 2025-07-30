import InfiniteCarrierDial from '@/components/InfiniteCarrierDial';

export default function Home() {
  return (
    <main className="flex items-center justify-between min-h-screen px-20 bg-white">
      <div>
        <p className="uppercase text-gray-600 font-semibold">Carrier</p>
        <h1 className="text-5xl font-bold text-gradient bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
          Carrier Partners
        </h1>
        <p className="mt-4 text-gray-600 max-w-md">
          Utilizing State-Of-The-Art Technology For Real-Time Tracking And Efficiency.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition">
          Get Started
        </button>
      </div>

      <InfiniteCarrierDial />
    </main>
  );
}
