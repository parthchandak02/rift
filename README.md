# rift

Rick & Morty characters as 3D floating portal rings in dark space. Each ring is a character from the multiverse — bigger ring = more episodes, color = alive/dead/unknown status.

**Visual Style:** Dark — Void (monochrome space with teal/coral/gold character accents)

**Data Source:** Rick & Morty API (rickandmortyapi.com)

**How it works:**
- Each floating portal ring represents a character from the show
- Ring size = episode count (more episodes = larger ring, more prominent character)
- Ring color = status: teal=Alive, coral=Dead, gold=Unknown
- Rings cluster by origin dimension (Earth dimensions, Abadango, unknown, etc.)
- OrbitControls for 3D navigation (drag to orbit, pinch to zoom)
- Tap any ring to reveal character details (name, species, status, episode count, origin)
- Auto-rotates slowly — each ring rotates and bobs independently

**GitHub:** https://github.com/parthchandak02/rift

**Live:** https://rift.parthchandak.info

**Tech:** React Three Fiber + drei. Hosted on Cloudflare Pages.
