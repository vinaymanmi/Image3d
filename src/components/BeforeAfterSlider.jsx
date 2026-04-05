import { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;

    // Support for both mouse and touch events
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const { left, width } = containerRef.current.getBoundingClientRect();

    // Calculate percentage, clamping between 0 and 100
    const percent = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100);
    setSliderPosition(percent);
  };

  const setupEvents = () => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', endDrag);
  };

  const endDrag = () => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', endDrag);
    window.removeEventListener('touchmove', handleDrag);
    window.removeEventListener('touchend', endDrag);
  };

  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize glass-panel border border-[var(--color-glass-border)] shadow-2xl shadow-[#00f2ff]/20"
      ref={containerRef}
      onMouseDown={setupEvents}
      onTouchStart={setupEvents}
    >
      {/* After image (background) */}
      <img src={afterImage} alt="3D Processed" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />

      {/* Before image (clipped foreground) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img src={beforeImage} alt="Original 2D" className="absolute top-0 left-0 max-w-none w-full h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100vw' }}
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/50 text-black">
          <ArrowLeftRight size={20} />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 glass-panel px-3 py-1 rounded bg-black/50 text-xs font-bold tracking-wider z-20 pointer-events-none">2D ORIGINAL</div>
      <div className="absolute bottom-4 right-4 glass-panel px-3 py-1 rounded bg-[var(--color-neon)]/20 text-[var(--color-neon)] border-[var(--color-neon)]/50 text-xs font-bold tracking-wider z-20 pointer-events-none">3D HOLOGRAM MAP</div>
    </div>
  );
}
