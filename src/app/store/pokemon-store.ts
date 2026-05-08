import { Injectable, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { IPokemon, IPokemonListResponse } from '../models/pokemon.model';
import { PokemonApiService } from '../services/pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonStoreService {
  private readonly pokemonApi = inject(PokemonApiService);

  loading = signal(false);
  pokemonList = signal<IPokemon[]>([]);
  pokemonListResponse = signal<IPokemonListResponse>({} as IPokemonListResponse);

  loadPokemons(url?: string): void {
    this.loading.set(true);
    this.pokemonApi
      .getPokemonList(url)
      .pipe(
        map((res: IPokemonListResponse) => {
          const results = res.results.map((pokemon) => {
            const id = this.extractPokemonId(pokemon.url);
            return {
              id,
              name: pokemon.name,
              image: this.getPokemonImage(id),
              url: pokemon.url,
            };
          });
          return { ...res, results };
        }),
      )
      .subscribe({
        next: (data: IPokemonListResponse) => {
          this.pokemonList.set(data.results);
          this.pokemonListResponse.set(data);
          this.loading.set(false);
        },
      });
  }

  nextPage(): void {
    if (!this.pokemonListResponse().next) return;
    this.loadPokemons(this.pokemonListResponse().next!);
  }

  prevPage(): void {
    if (!this.pokemonListResponse().previous) return;
    this.loadPokemons(this.pokemonListResponse().previous!);
  }

  searchPokemon(query: string): void {
    if (!query.trim()) {
      this.loadPokemons();
      return;
    }
    const filtered = this.pokemonList().filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.id?.toString().includes(query),
    );
    this.pokemonListResponse.set({ ...this.pokemonListResponse(), results: filtered });
  }
  private extractPokemonId(url: string): number {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
  }

  private getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
