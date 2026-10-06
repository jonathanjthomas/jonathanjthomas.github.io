export default function Home() {
  const phrase = "Something big is coming soon...";

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black select-none overflow-hidden m-0 p-0">
      {/* Continuous rolling text banner positioned in vertical center */}
      <div className="w-full overflow-hidden whitespace-nowrap py-6">
        <div className="marquee-track">
          {/* Primary track */}
          <div className="flex items-center shrink-0">
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
          </div>
          {/* Duplicate track for seamless infinite loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white px-8 sm:px-14 inline-block">
              {phrase}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
