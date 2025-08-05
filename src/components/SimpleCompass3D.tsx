import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SimpleStar = () => {
  const starRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={starRef}>
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={0.3}
        />
      </Sphere>
    </group>
  );
};

interface SimpleCompass3DProps {
  width?: string;
  height?: string;
  className?: string;
}

export const SimpleCompass3D = ({ 
  width = "400px", 
  height = "400px", 
  className = "" 
}: SimpleCompass3DProps) => {
  return (
    <div className={`${className} w-full h-full`}>
      <Canvas
        camera={{
          position: [0, 2, 4],
          fov: 45,
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
        <SimpleStar />
      </Canvas>
    </div>
  );
};

export default SimpleCompass3D;
