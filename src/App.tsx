import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PortalField } from './components/PortalField';
import { Chrome } from './components/Chrome';
import { QuietZone } from './components/QuietZone';
import { useStore } from './store';
import { fetchCharacters } from './data/characters';

function Scene() {
  const characters = useStore((s) => s.characters);

  if (characters.length === 0) return null;

  return (
    <>
      <ambientLight intensity={0.5} />
      <PortalField characters={characters} />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        minDistance={3}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function App() {
  const setCharacters = useStore((s) => s.setCharacters);
  const setLastFetchTime = useStore((s) => s.setLastFetchTime);
  const setIsLive = useStore((s) => s.setIsLive);

  useEffect(() => {
    fetchCharacters().then(({ characters, isLive }) => {
      setCharacters(characters);
      setIsLive(isLive);
      setLastFetchTime(performance.now());
    });
  }, [setCharacters, setLastFetchTime, setIsLive]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
      <Canvas
        style={{ background: '#0d0d0d', width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 2, 10], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Scene />
      </Canvas>

      <Chrome />
      <QuietZone />
    </div>
  );
}
