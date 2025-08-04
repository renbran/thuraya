import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Cylinder, Text, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

const ArabicPattern = ({ position }: { position: [number, number, number] }) => {
  const patternRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (patternRef.current) {
      patternRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={patternRef} position={position}>
      {/* Create geometric Islamic pattern */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 0.8;
        const z = Math.sin(radian) * 0.8;
        
        return (
          <Box key={index} args={[0.1, 0.1, 0.1]} position={[x, 0, z]}>
            <meshStandardMaterial 
              color="#B87333" 
              emissive="#B87333" 
              emissiveIntensity={0.1}
              metalness={0.7}
              roughness={0.3}
            />
          </Box>
        );
      })}
      
      {/* Central ornament */}
      <Ring args={[0.3, 0.5, 8]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#F4C430" 
          emissive="#F4C430" 
          emissiveIntensity={0.2}
        />
      </Ring>
    </group>
  );
};

const ModernTechNodes = ({ position }: { position: [number, number, number] }) => {
  const nodesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      nodesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={nodesRef} position={position}>
      {/* Tech nodes */}
      {[
        { pos: [0, 0.5, 0], color: "#00BFFF", size: 0.15 },
        { pos: [0.7, 0.2, 0.7], color: "#8A2BE2", size: 0.12 },
        { pos: [-0.7, 0.8, 0.3], color: "#FFD700", size: 0.1 },
        { pos: [0.3, -0.3, -0.8], color: "#40E0D0", size: 0.13 },
        { pos: [-0.5, 0.1, -0.5], color: "#FFD700", size: 0.08 },
      ].map((node, index) => (
        <Sphere key={index} args={[node.size, 16, 16]} position={node.pos as [number, number, number]}>
          <meshStandardMaterial 
            color={node.color} 
            emissive={node.color} 
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.1}
          />
        </Sphere>
      ))}
      
      {/* Connecting lines */}
      {[
        { start: [0, 0.5, 0], end: [0.7, 0.2, 0.7] },
        { start: [0.7, 0.2, 0.7], end: [-0.7, 0.8, 0.3] },
        { start: [-0.7, 0.8, 0.3], end: [0.3, -0.3, -0.8] },
        { start: [0.3, -0.3, -0.8], end: [-0.5, 0.1, -0.5] },
        { start: [-0.5, 0.1, -0.5], end: [0, 0.5, 0] },
      ].map((line, index) => {
        const start = new THREE.Vector3(...line.start);
        const end = new THREE.Vector3(...line.end);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        
        return (
          <Cylinder 
            key={index}
            args={[0.02, 0.02, length, 8]}
            position={[midpoint.x, midpoint.y, midpoint.z]}
            rotation={[
              Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z)),
              Math.atan2(direction.x, direction.z),
              0
            ]}
          >
            <meshStandardMaterial 
              color="#00BFFF" 
              emissive="#00BFFF" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </Cylinder>
        );
      })}
    </group>
  );
};

const BridgeStructure = () => {
  const bridgeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bridgeRef.current) {
      bridgeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={bridgeRef}>
      {/* Main bridge span */}
      <Box args={[6, 0.2, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a365d" 
          emissive="#1a365d" 
          emissiveIntensity={0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>
      
      {/* Support pillars */}
      <Cylinder args={[0.1, 0.15, 2]} position={[-2, -1, 0]}>
        <meshStandardMaterial 
          color="#8A2BE2" 
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      
      <Cylinder args={[0.1, 0.15, 2]} position={[2, -1, 0]}>
        <meshStandardMaterial 
          color="#8A2BE2" 
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      
      {/* Bridge cables */}
      {[-2, -1, 0, 1, 2].map((x, index) => (
        <Cylinder 
          key={index}
          args={[0.02, 0.02, 1.5]}
          position={[x, 0.75, 0]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.1}
          />
        </Cylinder>
      ))}
    </group>
  );
};

const FloatingDataStreams = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ] as [number, number, number],
        scale: Math.random() * 0.1 + 0.05,
      });
    }
    return temp;
  }, []);

  const streamRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (streamRef.current) {
      streamRef.current.children.forEach((child, index) => {
        const particle = particles[index];
        child.position.x += particle.velocity[0];
        child.position.y += particle.velocity[1];
        child.position.z += particle.velocity[2];
        
        // Reset position if out of bounds
        if (Math.abs(child.position.x) > 5) particle.velocity[0] *= -1;
        if (Math.abs(child.position.y) > 3) particle.velocity[1] *= -1;
        if (Math.abs(child.position.z) > 5) particle.velocity[2] *= -1;
      });
    }
  });

  return (
    <group ref={streamRef}>
      {particles.map((particle, index) => (
        <Sphere 
          key={index} 
          args={[particle.scale, 8, 8]} 
          position={particle.position}
        >
          <meshStandardMaterial 
            color="#40E0D0" 
            emissive="#40E0D0" 
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}
    </group>
  );
};

interface CulturalBridge3DProps {
  width?: string;
  height?: string;
  className?: string;
}

export const CulturalBridge3D = ({ 
  width = "100%", 
  height = "500px", 
  className = "" 
}: CulturalBridge3DProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-[500px]">
        <Canvas
          camera={{
            position: [8, 4, 8],
            fov: 50,
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFD700" />
          <pointLight position={[-10, 5, -10]} intensity={0.8} color="#8A2BE2" />
          <spotLight 
            position={[0, 15, 0]} 
            intensity={2} 
            color="#00BFFF"
            angle={Math.PI / 3}
            penumbra={0.3}
            castShadow
          />
          
          {/* 3D Components */}
          <BridgeStructure />
          <ArabicPattern position={[-4, 1, 0]} />
          <ModernTechNodes position={[4, 1, 0]} />
          <FloatingDataStreams />
          
          {/* Labels */}
          <Text
            position={[-4, 2.5, 0]}
            fontSize={0.3}
            color="#B87333"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            CULTURAL WISDOM
          </Text>
          
          <Text
            position={[4, 2.5, 0]}
            fontSize={0.3}
            color="#00BFFF"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            MODERN TECHNOLOGY
          </Text>
          
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.25}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            THURAYA PATH BRIDGE
          </Text>
          
          {/* Environment */}
          <fog attach="fog" args={['#1a365d', 15, 40]} />
        </Canvas>
      </div>
    </div>
  );
};

export default CulturalBridge3D;
