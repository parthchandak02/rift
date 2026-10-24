import { useMemo } from 'react';
import { PortalRing } from './PortalRing';
import type { CharacterData } from '../data/characters';
import { useStore } from '../store';

interface PortalFieldProps {
  characters: CharacterData[];
}

function getClusterPosition(origin: string, index: number, total: number): [number, number, number] {
  const hash = origin.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const clusterAngle = ((hash * 137) % 360) * (Math.PI / 180);
  const clusterRadius = 3 + (hash % 7) * 0.8;
  const spread = 2.5;
  const px = Math.cos(clusterAngle) * clusterRadius + (Math.random() - 0.5) * spread;
  const py = (Math.random() - 0.5) * spread * 0.8;
  const pz = Math.sin(clusterAngle) * clusterRadius + (Math.random() - 0.5) * spread;
  return [px, py, pz] as [number, number, number];
}

export function PortalField({ characters }: PortalFieldProps) {
  const setSelectedRing = useStore((s) => s.setSelectedRing);
  const maxEpisodes = useMemo(() => Math.max(...characters.map((c) => c.episodeCount), 1), [characters]);

  const positions = useMemo(() => {
    const raw = characters.map((c, i) => getClusterPosition(c.originName, i, characters.length));
    // Re-centre the whole field on the orbit target so it stays in frame as the camera turns
    const n = raw.length || 1;
    const cx = raw.reduce((a, p) => a + p[0], 0) / n;
    const cy = raw.reduce((a, p) => a + p[1], 0) / n;
    const cz = raw.reduce((a, p) => a + p[2], 0) / n;
    return raw.map(([x, y, z]) => [x - cx, y - cy, z - cz] as [number, number, number]);
  }, [characters]);

  const clearSelection = () => setSelectedRing(null);

  return (
    <group onClick={clearSelection}>
      {characters.map((char, i) => (
        <PortalRing
          key={char.id}
          data={char}
          position={positions[i]}
          maxEpisodeCount={maxEpisodes}
        />
      ))}
    </group>
  );
}
