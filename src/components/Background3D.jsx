import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

function AnimatedShapes() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Floating sphere with distorted liquid material in the center */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
        <Sphere args={[1, 64, 64]} position={[0, 0, -3]} scale={2.5}>
          <MeshDistortMaterial
            color="var(--color-neon)"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.2}
          />
        </Sphere>
      </Float>

      {/* Floating wireframe torus knot layered over the sphere */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} floatingRange={[-1, 1]}>
        <mesh position={[0, 0, -3]} rotation={[0.4, 0.2, 0.5]}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshStandardMaterial
            color="#8a2be2"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      {/* Animated point stars in background */}
      <Stars radius={100} depth={50} count={3500} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <AnimatedShapes />
      </Canvas>
    </div>
  );
}
