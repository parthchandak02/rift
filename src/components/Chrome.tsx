import { useEffect, useState } from 'react';
import { useStore } from '../store';

export function Chrome() {
  const characters = useStore((s) => s.characters);
  const lastFetchTime = useStore((s) => s.lastFetchTime);
  const isLive = useStore((s) => s.isLive);
  const totalCount = useStore((s) => s.totalCount);
  const [timeAgo, setTimeAgo] = useState('0s');

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastFetchTime > 0) {
        const ago = Math.round((performance.now() - lastFetchTime) / 1000);
        setTimeAgo(`${ago}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastFetchTime]);

  const statusText = isLive ? 'live' : 'cached';

  return (
    <>
      {/* Hero Number */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 100,
        fontFamily: 'system-ui, sans-serif',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: 200,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          {characters.length || '–'}
        </div>
        <div style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '4px',
          letterSpacing: '0.5px',
        }}>
          {totalCount ? `of ${totalCount} in the Rick & Morty multiverse` : 'Rick & Morty Multiverse'}
        </div>
      </div>

      {/* Data Stamp */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '16px',
        zIndex: 100,
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.45)',
        pointerEvents: 'none',
        letterSpacing: '0.3px',
      }}>
        Rick & Morty API · {characters.length} chars · {statusText} · {timeAgo}
      </div>

      {/* Legend */}
      <div style={{
        position: 'fixed',
        bottom: '44px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.35)',
        pointerEvents: 'none',
        textAlign: 'center',
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ color: '#14c8b0' }}>●</span> Alive{' '}
        <span style={{ color: '#ff5c5c', marginLeft: '8px' }}>●</span> Dead{' '}
        <span style={{ color: '#ffb347', marginLeft: '8px' }}>●</span> Unknown{' '}
        <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.25)' }}>·</span>{' '}
        Bigger ring = more episodes
      </div>

      {/* Description */}
      <div style={{
        position: 'fixed',
        bottom: '68px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        fontFamily: 'system-ui, sans-serif',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
        pointerEvents: 'none',
        textAlign: 'center',
        maxWidth: '65ch',
      }}>
        Each floating portal ring is a character from the Rick & Morty multiverse. Bigger ring = more episodes. Tap any ring for details.
      </div>
    </>
  );
}
