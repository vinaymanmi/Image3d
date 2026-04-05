import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: "Starter",
    price: "Free",
    features: ["5 Image conversions/day", "Standard 720p export", "Community support", "Watermarked"],
    buttonText: "Start for free",
    highlight: false
  },
  {
    name: "Pro",
    price: "$9/mo",
    features: ["Unlimited conversions", "4K 60fps exports", "Custom physics tuning", "No watermark", "Priority rendering"],
    buttonText: "Upgrade to Pro",
    highlight: true
  },
  {
    name: "Studio",
    price: "$29/mo",
    features: ["API Access", "Batch processing", "Team workspaces", "Raw depth maps", "24/7 dedicated support"],
    buttonText: "Contact Sales",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative max-w-7xl mx-auto">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl font-bold font-montserrat mb-4">Simple, transparent pricing</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Start for free, upgrade when you need more power and higher resolutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto z-10 relative">
        {tiers.map((tier, idx) => (
          <div 
            key={idx} 
            className={`glass-panel p-8 rounded-2xl flex flex-col relative ${tier.highlight ? 'border-[var(--color-neon)] border-2 scale-105 shadow-2xl shadow-[var(--color-neon)]/20' : 'border-white/10'}`}
          >
            {tier.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-neon)] text-black font-bold px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <div className="text-4xl font-bold mb-6 font-montserrat">{tier.price}</div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-neon)]/20 flex items-center justify-center">
                    <Check size={12} className="text-[var(--color-neon)]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link 
              to="/login"
              className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${
                tier.highlight 
                  ? 'bg-[var(--color-neon)] text-black hover:bg-[#00d4ff]' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {tier.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
