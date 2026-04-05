import { Layers, Wand2, Zap, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-8 h-8 text-[var(--color-neon)]" />,
    title: "AI Depth Extraction",
    description: "Automatically analyzes your flat images to generate complex topological matrices and depth maps in seconds."
  },
  {
    icon: <Wand2 className="w-8 h-8 text-purple-400" />,
    title: "Instant Parallax Mapping",
    description: "Converts structural data into layered planes mapped securely inside our custom WebGL Three.js renderer."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "60FPS Interaction",
    description: "Experience fully fluid, hardware-accelerated 3D tilt effects bound to your device gyroscope and cursor."
  },
  {
    icon: <Share2 className="w-8 h-8 text-pink-400" />,
    title: "Export & Share",
    description: "Export your creation as an interactive web link or a looping video to share across social networks instantly."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative max-w-7xl mx-auto">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-bold font-montserrat mb-4">Magic under the hood</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          DepthLens combines heavy machine learning approximation models with ultra-light WebGL instances to give you an unparalleled dynamic interaction layer.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative">
        {features.map((feature, idx) => (
          <div key={idx} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 group cursor-default">
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
