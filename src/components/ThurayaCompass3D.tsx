import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring, Text, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Star {
  position: [number, number, number];
  scale: number;
}

const StarField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={pointsRef} positions={stars} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00BFFF"
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const ThurayaStar = () => {
  const starRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      starRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={starRef}>
      {/* Central core */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      
      {/* Star rays */}
      {[0, 60, 120, 180, 240, 300].map((angle, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 1.5;
        const z = Math.sin(radian) * 1.5;
        
        return (
          <group key={index}>
            {/* Main ray */}
            <mesh position={[x, 0, z]} rotation={[0, radian, 0]}>
              <boxGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700" 
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Ray tip */}
            <Sphere args={[0.1, 16, 16]} position={[x * 1.2, 0, z * 1.2]}>
              <meshStandardMaterial 
                color="#00BFFF" 
                emissive="#00BFFF" 
                emissiveIntensity={0.4}
              />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

const CompassRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ringsRef}>
      {/* Outer ring */}
      <Ring args={[2.8, 3, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#8A2BE2" 
          transparent 
          opacity={0.6}
          emissive="#8A2BE2"
          emissiveIntensity={0.1}
        />
      </Ring>
      
      {/* Middle ring */}
      <Ring args={[2.2, 2.4, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#00BFFF" 
          transparent 
          opacity={0.8}
          emissive="#00BFFF"
          emissiveIntensity={0.1}
        />
      </Ring>
      
      {/* Inner ring */}
      <Ring args={[1.6, 1.8, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.7}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </Ring>
    </group>
  );
};

const DirectionalText = () => {
  return (
    <group>
      {/* North */}
      <Text
        position={[0, 0, -3.5]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        INNOVATION
      </Text>
      
      {/* East */}
      <Text
        position={[3.5, 0, 0]}
        fontSize={0.3}
        color="#00BFFF"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
        font="/fonts/inter-bold.woff"
      >
        GROWTH
      </Text>
      
      {/* South */}
      <Text
        position={[0, 0, 3.5]}
        fontSize={0.3}
        color="#8A2BE2"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        TRANSFORMATION
      </Text>
      
      {/* West */}
      <Text
        position={[-3.5, 0, 0]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
        font="/fonts/inter-bold.woff"
      >
        WISDOM
      </Text>
    </group>
  );
};

interface ThurayaCompass3DProps {
  width?: string;
  height?: string;
  className?: string;
}

export const ThurayaCompass3D = ({ 
  width = "400px", 
  height = "400px", 
  className = "" 
}: ThurayaCompass3DProps) => {
  return (
    <div className={`${className}`} style={{ width, height }}>
      <Canvas
        camera={{
          position: [0, 5, 8],
          fov: 45,
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00BFFF" />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={1.5} 
          color="#8A2BE2"
          angle={Math.PI / 4}
          penumbra={0.5}
          castShadow
        />
        
        {/* 3D Components */}
        <StarField />
        <ThurayaStar />
        <CompassRings />
        <DirectionalText />
        
        {/* Environment */}
        <fog attach="fog" args={['#1a365d', 10, 50]} />
      </Canvas>
    </div>
  );
};

export default ThurayaCompass3D;
