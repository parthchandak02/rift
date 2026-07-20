import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RingGeometry, AdditiveBlending, DoubleSide } from 'three';
import type { CharacterData } from '../data/characters';
import { useStore } from '../store';

const STATUS_COLORS: Record<string, string> = {
  Alive: '#14c8b0',
  Dead: '#ff5c5c',
  unknown: '#ffb347',
};

interface PortalRingProps {
  data: CharacterData;
  position: [number, number, number];
  maxEpisodeCount: number;
}

export function PortalRing({ data, position, maxEpisodeCount }: PortalRingProps) {
  const meshRef = useRef<any>(null);
  const innerRef = useRef<any>(null);
  const rimRef = useRef<any>(null);
  const rotationSpeed = useMemo(() => 0.2 + Math.random() * 0.3, []);
  const bobSpeed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const bobOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const baseY = position[1];

  const scale = 0.3 + (data.episodeCount / maxEpisodeCount) * 2.7;
  const color = STATUS_COLORS[data.status] || STATUS_COLORS.unknown;
  const innerRadius = 0.2;
  const outerRadius = innerRadius + scale;
  const segments = 48;

  const handleClick = (e: any) => {
    e.stopPropagation();
    useStore.getState().setSelectedRing(data);
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
    meshRef.current.rotation.z += delta * rotationSpeed * 0.2;
    const bob = Math.sin(performance.now() * 0.001 * bobSpeed + bobOffset) * 0.15;
    meshRef.current.position.y = baseY + bob;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main ring */}
      <mesh onClick={handleClick}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.85}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Inner glow ring */}
      <mesh>
        <ringGeometry args={[innerRadius * 0.6 - 0.02, innerRadius * 0.6 + 0.02, segments]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer rim highlight */}
      <mesh ref={rimRef}>
        <ringGeometry args={[outerRadius - 0.02, outerRadius + 0.01, segments]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
