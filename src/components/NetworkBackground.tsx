import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkNodeProps {
  position: [number, number, number];
  connections: number[];
}

function NetworkNode({ position, connections }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color="#ffb347"
        emissive="#ffb347"
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ]);
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines: JSX.Element[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i][0] - nodes[j][0], 2) +
          Math.pow(nodes[i][1] - nodes[j][1], 2) +
          Math.pow(nodes[i][2] - nodes[j][2], 2)
        );
        
        if (distance < 2.5) {
          const points = [
            new THREE.Vector3(...nodes[i]),
            new THREE.Vector3(...nodes[j])
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          lines.push(
            <primitive key={`${i}-${j}`} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
              color: "#00cfff",
              transparent: true,
              opacity: 0.3
            }))} />
          );
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {connections}
      {nodes.map((position, index) => (
        <NetworkNode key={index} position={position} connections={[]} />
      ))}
    </group>
  );
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7a4ef3"
        size={0.02}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffb347" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00cfff" />
        
        <ConnectionLines />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}