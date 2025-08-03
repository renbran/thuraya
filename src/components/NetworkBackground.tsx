import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NetworkNode({ position }: { position: [number, number, number] }) {
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
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial
        color="#ffb347"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  const { nodes, lines } = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    for (let i = 0; i < 15; i++) {
      nodePositions.push([
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      ]);
    }

    const lineObjects: THREE.Line[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodePositions[i][0] - nodePositions[j][0], 2) +
          Math.pow(nodePositions[i][1] - nodePositions[j][1], 2) +
          Math.pow(nodePositions[i][2] - nodePositions[j][2], 2)
        );
        
        if (distance < 2) {
          const points = [
            new THREE.Vector3(...nodePositions[i]),
            new THREE.Vector3(...nodePositions[j])
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: "#00cfff",
            transparent: true,
            opacity: 0.2
          });
          const line = new THREE.Line(geometry, material);
          lineObjects.push(line);
        }
      }
    }
    
    return { nodes: nodePositions, lines: lineObjects };
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => (
        <primitive key={index} object={line} />
      ))}
      {nodes.map((position, index) => (
        <NetworkNode key={index} position={position} />
      ))}
    </group>
  );
}

function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        size={0.01}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffb347" />
        <pointLight position={[-5, -5, -5]} intensity={0.2} color="#00cfff" />
        
        <ConnectionLines />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}