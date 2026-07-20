import { useEffect, useState } from 'react';
import { useStore } from '../store';

const STATUS_LABELS: Record<string, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
};

export function QuietZone() {
  const selectedRing = useStore((s) => s.selectedRing);
  const setSelectedRing = useStore((s) => s.setSelectedRing);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (selectedRing) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setSelectedRing(null), 400);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [selectedRing, setSelectedRing]);

  if (!selectedRing || !visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'rgba(255,255,255,0.9)',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      pointerEvents: 'none',
      zIndex: 100,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
        {selectedRing.name}
      </div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
        {selectedRing.species} · {STATUS_LABELS[selectedRing.status] || selectedRing.status}
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>
        {selectedRing.episodeCount} episodes · {selectedRing.originName}
      </div>
    </div>
  );
}
