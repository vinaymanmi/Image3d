import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function ParallaxImage({ url, autoFocus }) {
  const meshRef = useRef();
  const texture = useTexture(url);
  const [hovered, setHovered] = useState(false);

  // Animate the image based on mouse pointer or automatic focus logic
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (autoFocus && !hovered) {
        // Auto simulate random rotational depth via elapsed sine waves
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          Math.sin(t * 0.8) * 0.25,
          delta * 2
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          (Math.cos(t * 1.2) * 0.3) + (Math.sin(t * 0.5) * 0.1),
          delta * 2
        );
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0.2, delta * 2);
      } else {
        // Smoothly interpolate rotation to follow the manual cursor mouse
        const targetX = (state.pointer.y * Math.PI) / 6;
        const targetY = (state.pointer.x * Math.PI) / 6;
        
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          targetX,
          delta * 5
        );
        
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          targetY,
          delta * 5
        );
        
        // Add slight pop-out effect on hover
        const targetZ = hovered ? 0.5 : 0;
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          targetZ,
          delta * 5
        );
      }
    }
  });

  return (
    <group>
      {/* Dynamic light that follows the mouse */}
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#00f2ff" />
      <ambientLight intensity={1.5} />
      
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[6, 4, 32, 32]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.1}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
        
        {/* Adds a second displaced layer to create a depth/parallax illusion */}
        {hovered && (
          <mesh position={[0, 0, -0.2]} scale={1.05}>
            <planeGeometry args={[6, 4]} />
            <meshBasicMaterial map={texture} opacity={0.3} transparent />
          </mesh>
        )}
      </mesh>
    </group>
  );
}
