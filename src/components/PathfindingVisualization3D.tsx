import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Text, Ring, Line } from '@react-three/drei';
import * as THREE from 'three';

interface PathStep {
  position: [number, number, number];
  color: string;
  label: string;
  icon: string;
}

const PathfindingNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const pathSteps: PathStep[] = [
    { position: [-3, 0, 0], color: "#FFD700", label: "Assess", icon: "🧭" },
    { position: [-1, 1, 0], color: "#00BFFF", label: "Design", icon: "⚙️" },
    { position: [1, 1, 0], color: "#8A2BE2", label: "Transform", icon: "🚀" },
    { position: [3, 0, 0], color: "#40E0D0", label: "Navigate", icon: "🎯" },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Path connections */}
      {pathSteps.slice(0, -1).map((step, index) => {
        const nextStep = pathSteps[index + 1];
        const start = new THREE.Vector3(...step.position);
        const end = new THREE.Vector3(...nextStep.position);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        
        return (
          <Cylinder 
            key={index}
            args={[0.05, 0.05, length, 8]}
            position={[midpoint.x, midpoint.y, midpoint.z]}
            rotation={[
              0,
              Math.atan2(direction.x, direction.z),
              -Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z))
            ]}
          >
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </Cylinder>
        );
      })}

      {/* Path nodes */}
      {pathSteps.map((step, index) => (
        <group key={index} position={step.position}>
          {/* Node sphere */}
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial 
              color={step.color} 
              emissive={step.color} 
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
          
          {/* Orbiting ring */}
          <Ring args={[0.4, 0.5, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color={step.color} 
              transparent 
              opacity={0.4}
              emissive={step.color}
              emissiveIntensity={0.1}
            />
          </Ring>
          
          {/* Label */}
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color={step.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {step.label}
          </Text>
        </group>
      ))}

      {/* Success destination */}
      <group position={[5, 0, 0]}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </Sphere>
        
        {/* Success glow */}
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.2}
            emissive="#FFD700"
            emissiveIntensity={0.3}
          />
        </Sphere>
        
        <Text
          position={[0, -1, 0]}
          fontSize={0.25}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          SUCCESS
        </Text>
      </group>
    </group>
  );
};

const FloatingIcons = () => {
  const iconsRef = useRef<THREE.Group>(null);
  
  const icons = useMemo(() => [
    { position: [-4, 2, -2], scale: 0.8, color: "#B87333" },
    { position: [0, 3, -1], scale: 1.2, color: "#40E0D0" },
    { position: [4, 2.5, -2], scale: 1, color: "#F4C430" },
    { position: [-2, -1, 2], scale: 0.9, color: "#8A2BE2" },
    { position: [2, -0.5, 1], scale: 1.1, color: "#00BFFF" },
  ], []);

  useFrame((state) => {
    if (iconsRef.current) {
      iconsRef.current.children.forEach((child, index) => {
        const icon = icons[index];
        child.position.y = icon.position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
        child.rotation.y = state.clock.elapsedTime * (0.5 + index * 0.1);
      });
    }
  });

  return (
    <group ref={iconsRef}>
      {icons.map((icon, index) => (
        <Box 
          key={index} 
          args={[0.2, 0.2, 0.2]} 
          position={icon.position as [number, number, number]}
          scale={icon.scale}
        >
          <meshStandardMaterial 
            color={icon.color} 
            emissive={icon.color} 
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.4}
          />
        </Box>
      ))}
    </group>
  );
};

const CulturalPatterns = () => {
  const patternRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (patternRef.current) {
      patternRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={patternRef} position={[0, -2, 0]}>
      {/* Islamic geometric pattern base */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 2;
        const z = Math.sin(radian) * 2;
        
        return (
          <Box key={index} args={[0.1, 0.05, 0.1]} position={[x, 0, z]}>
            <meshStandardMaterial 
              color="#B87333" 
              emissive="#B87333" 
              emissiveIntensity={0.1}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.6}
            />
          </Box>
        );
      })}
    </group>
  );
};

interface PathfindingVisualization3DProps {
  width?: string;
  height?: string;
  className?: string;
}

export const PathfindingVisualization3D = ({ 
  width = "100%", 
  height = "400px", 
  className = "" 
}: PathfindingVisualization3DProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-[400px]">
        <Canvas
          camera={{
            position: [6, 3, 6],
            fov: 60,
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />
          <pointLight position={[-10, 5, -10]} intensity={1} color="#00BFFF" />
          <spotLight 
            position={[0, 8, 0]} 
            intensity={2} 
            color="#8A2BE2"
            angle={Math.PI / 4}
            penumbra={0.5}
            castShadow
          />
          
          {/* 3D Components */}
          <PathfindingNodes />
          <FloatingIcons />
          <CulturalPatterns />
          
          {/* Title */}
          <Text
            position={[0, 3, 0]}
            fontSize={0.4}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            THURAYA PATHFINDING
          </Text>
          
          <Text
            position={[0, 2.4, 0]}
            fontSize={0.2}
            color="#40E0D0"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            Cultural Intelligence + Automation Excellence
          </Text>
          
          {/* Environment */}
          <fog attach="fog" args={['#1a365d', 8, 25]} />
        </Canvas>
      </div>
    </div>
  );
};

export default PathfindingVisualization3D;
