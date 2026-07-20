// Rick & Morty character data fetching
const C = {
  pages: 5, // fetch first 100 characters (5 pages, 20 each)
  maxCharacters: 100,
};

interface CharacterData {
  id: number;
  name: string;
  species: string;
  status: string;
  episodeCount: number;
  originName: string;
}

const FALLBACK_CHARACTERS: CharacterData[] = [
  { id: 1, name: "Rick Sanchez", species: "Human", status: "Alive", episodeCount: 51, originName: "Earth (C-137)" },
  { id: 2, name: "Morty Smith", species: "Human", status: "Alive", episodeCount: 51, originName: "unknown" },
  { id: 3, name: "Summer Smith", species: "Human", status: "Alive", episodeCount: 42, originName: "Earth (Replacement Dimension)" },
  { id: 4, name: "Beth Smith", species: "Human", status: "Alive", episodeCount: 42, originName: "Earth (Replacement Dimension)" },
  { id: 5, name: "Jerry Smith", species: "Human", status: "Alive", episodeCount: 39, originName: "Earth (Replacement Dimension)" },
  { id: 6, name: "Abadango Cluster Princess", species: "Alien", status: "Alive", episodeCount: 4, originName: "Abadango" },
  { id: 7, name: "Abradolph Lincler", species: "Human", status: "unknown", episodeCount: 4, originName: "Earth (Replacement Dimension)" },
  { id: 8, name: "Adjudicator Rick", species: "Human", status: "Dead", episodeCount: 2, originName: "unknown" },
  { id: 9, name: "Agency Director", species: "Human", status: "Dead", episodeCount: 3, originName: "Earth (Replacement Dimension)" },
  { id: 10, name: "Alan Rails", species: "Human", status: "Dead", episodeCount: 4, originName: "unknown" },
  { id: 11, name: "Albert Einstein", species: "Human", status: "Dead", episodeCount: 3, originName: "Earth (C-137)" },
  { id: 12, name: "Alexander", species: "Human", status: "Dead", episodeCount: 2, originName: "Earth (C-137)" },
  { id: 13, name: "Alien Googah", species: "Alien", status: "unknown", episodeCount: 2, originName: "unknown" },
  { id: 14, name: "Alien Morty", species: "Alien", status: "unknown", episodeCount: 2, originName: "unknown" },
  { id: 15, name: "Alien Rick", species: "Alien", status: "unknown", episodeCount: 2, originName: "unknown" },
  { id: 16, name: "Amish Cyborg", species: "Alien", status: "Dead", episodeCount: 2, originName: "unknown" },
  { id: 17, name: "Annie", species: "Human", status: "Alive", episodeCount: 3, originName: "Earth (C-137)" },
  { id: 18, name: "Antenna Morty", species: "Humanoid", status: "Alive", episodeCount: 2, originName: "unknown" },
  { id: 19, name: "Antenna Rick", species: "Humanoid", status: "unknown", episodeCount: 2, originName: "unknown" },
  { id: 20, name: "Ants in my Eyes Johnson", species: "Human", status: "unknown", episodeCount: 2, originName: "Earth (C-137)" },
];

async function fetchPage(page: number): Promise<CharacterData[]> {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.results.map((c: any) => ({
    id: c.id,
    name: c.name,
    species: c.species,
    status: c.status,
    episodeCount: c.episode.length,
    originName: c.origin.name,
  }));
}

async function fetchCharacters(): Promise<{ characters: CharacterData[]; isLive: boolean }> {
  try {
    const pages = Array.from({ length: C.pages }, (_, i) => i + 1);
    const results = await Promise.all(pages.map(fetchPage));
    const characters = results.flat().slice(0, C.maxCharacters);
    return { characters, isLive: true };
  } catch {
    return { characters: FALLBACK_CHARACTERS, isLive: false };
  }
}

export type { CharacterData };
export { C, FALLBACK_CHARACTERS, fetchCharacters };
