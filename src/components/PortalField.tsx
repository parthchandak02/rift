import { useMemo } from 'react';
import { PortalRing } from './PortalRing';
import type { CharacterData } from '../data/characters';
import { useStore } from '../store';

interface PortalFieldProps {
  characters: CharacterData[];
}

function getClusterPosition(origin: string, index: number, total: number): [number, number, number] {
  const hash = origin.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const clusterAngle = (hash % 360) * (Math.PI / 180) * 0.1;
  const clusterRadius = 5 + (hash % 7) * 1.5;
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
    return characters.map((c, i) => getClusterPosition(c.originName, i, characters.length));
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
