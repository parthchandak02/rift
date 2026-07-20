import { useRef } from 'react';
import * as THREE from 'three';

export function Background() {
  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <meshBasicMaterial color="#0d0d0d" side={THREE.BackSide} />
    </mesh>
  );
}
