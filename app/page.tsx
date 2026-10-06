import AnimatedEyes from "@/components/AnimatedEyes";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black px-6 select-none overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-10 max-w-xl text-center">
        {/* Subtle headline text */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.25em] text-neutral-200 uppercase transition-opacity duration-1000">
          Something big is coming soon...
        </h1>

        {/* Animated Eyes looking left, right and closing */}
        <div className="pt-2">
          <AnimatedEyes />
        </div>
      </div>
    </main>
  );
}
