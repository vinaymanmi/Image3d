import { Canvas } from '@react-three/fiber';
import { ParallaxImage } from './ParallaxImage';
import { Suspense } from 'react';

export default function ThreeCanvas({ imageUrl, autoFocus }) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden glass-panel">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ParallaxImage url={imageUrl} autoFocus={autoFocus} />
        </Suspense>
      </Canvas>
    </div>
  );
}
