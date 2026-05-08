export interface IPokemon {
  id?: number;
  name: string;
  image?: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}
