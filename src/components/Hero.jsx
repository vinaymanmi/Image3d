import BeforeAfterSlider from './BeforeAfterSlider';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      {/* Text Content */}
      <div className="flex-1 text-center lg:text-left z-10">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-neon)]/30 bg-[var(--color-neon)]/10 text-[var(--color-neon)] text-sm font-semibold mb-6 animate-pulse">
          Next-Gen 3D Rendering Engine
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold font-montserrat leading-tight mb-6">
          Transforming<br />
          Memories into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon)] to-blue-500">3D</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
          Upload any 2D photo and let our AI-powered engine instantly generate dynamic parallax layers and immersive depth maps. Give your images life.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <Link to="/login" className="w-full sm:w-auto bg-[var(--color-neon)] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all hover:scale-105 flex items-center justify-center gap-2">
            Try it now for free <ChevronRight size={20} />
          </Link>
          <a href="#features" className="w-full sm:w-auto border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
            How it works
          </a>
        </div>
      </div>
      
      {/* Visual content (Slider) */}
      <div className="flex-1 w-full z-10 relative">
        <div className="absolute inset-0 bg-[var(--color-neon)] rounded-full blur-[120px] opacity-20 transform -rotate-12 translate-x-10 scale-110 pointer-events-none"></div>
        <BeforeAfterSlider beforeImage="/before.png" afterImage="/after.png" />
      </div>
    </section>
  );
}
