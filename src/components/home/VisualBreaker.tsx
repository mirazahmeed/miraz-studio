import Image from "next/image";

export function VisualBreaker() {
  return (
    <section className="py-16 sm:py-24 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Full Viewport Width Panoramic Architectural Composition */}
        <div className="relative w-full aspect-16/9 md:aspect-21/9 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
            alt="Built with intention architectural composition"
            fill
            className="object-cover"
            sizes="(max-width: 1536px) 100vw, 1500px"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Minimal Corner Caption */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-[#111111] border border-[#E6E6E4]">
            BUILT WITH INTENTION • 2026
          </div>
        </div>

        {/* Delicate Slider / Pagination Bar matching reference */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8E8E93]">
            SPATIAL MONOGRAPH 01 / 03
          </span>
          <div className="w-36 sm:w-48 h-[2px] bg-neutral-200 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#111111]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8E8E93]">
            EXPLORE DETAILS
          </span>
        </div>
      </div>
    </section>
  );
}
