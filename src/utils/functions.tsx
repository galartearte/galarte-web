import { artworks, artists } from "./data";

export const dateToAge = (date: string): number => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

//-------------------------------------------------------------------------
//ARTISTS FUNCTIONS

export function getAllArtists(): any[] {
  return artists;
}

export function getArtistById(id: number): any | undefined {
  const artist = artists.find(art => art.id === +id);

  return artist;
}

//------------------------------------------------------------------------
//ARTWORKS FUNCTIONS

export function getAllArtworks(): any[] {
  return artworks;
}

export function getArtworkByName(name: string): any[] {
  const filteredArtworks = artworks.filter(artwork =>
    artwork.name.toLowerCase().includes(name.toLowerCase())
  );

  return filteredArtworks.length > 0 ? filteredArtworks : artworks;
}

export function getArtworkById(id: number): any | undefined {
  const artwork = artworks.find(art => art.id === +id);

  return artwork;
}

export function getArtworksByArtistId(artistId: number , limit?: number): any[] {
  const filteredArtworks = artworks.filter(artwork => artwork.artistId === +artistId);

  return limit ? filteredArtworks.slice(0, limit) : filteredArtworks;
}

export function getRandomArtworks(): any[] {
  const shuffled = [...artworks].sort(() => Math.random() - 0.5);

  const distinctArtworks: any[] = [];
  const artistIds = new Set<number>();

  for (const artwork of shuffled) {
    if (!artistIds.has(artwork.artistId)) {
      distinctArtworks.push(artwork);
      artistIds.add(artwork.artistId);
      if (distinctArtworks.length === 7) break;
    }
  }

  if (distinctArtworks.length < 7) {
    const remaining = shuffled.filter(a => !distinctArtworks.includes(a));
    for (const extra of remaining) {
      distinctArtworks.push(extra);
      if (distinctArtworks.length === 7) break;
    }
  }

  return distinctArtworks;
}
