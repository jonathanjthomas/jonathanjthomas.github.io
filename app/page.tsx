import AnimatedEyes from "@/components/AnimatedEyes";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-5 sm:px-8 md:px-12 select-none overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-10 sm:gap-14 md:gap-16 max-w-5xl w-full text-center">
        {/* Big, bold headline with highlights and deep drop-shadow */}
        <h1 className="headline-glow text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase text-white leading-[1.15] sm:leading-[1.12]">
          Something big is coming soon...
        </h1>

        {/* Tall oval animated eyes */}
        <div className="flex items-center justify-center w-full">
          <AnimatedEyes />
        </div>
      </div>
    </main>
  );
}
