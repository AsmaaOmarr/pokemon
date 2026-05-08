import { Injectable, inject, signal } from '@angular/core';
import { map } from 'rxjs';
import { IPokemon } from '../models/pokemon.model';
import { PokemonApiService } from '../services/pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonStoreService {
  private readonly pokemonApi = inject(PokemonApiService);

  loading = signal(false);
  pokemonCount = signal(0);
  pokemonList = signal<IPokemon[]>([]);
  //pagination properties
  nextUrl = signal<string | null>(null);
  prevUrl = signal<string | null>(null);

  loadPokemons(url?: string): void {
    this.loading.set(true);
    this.pokemonApi
      .getPokemonList(url)
      .pipe(
        map((res) => {
          this.nextUrl.set(res.next);
          this.prevUrl.set(res.previous);
          this.pokemonCount.set(res.count);
          return res.results.map((pokemon) => {
            const id = this.extractPokemonId(pokemon.url);
            return {
              id,
              name: pokemon.name,
              image: this.getPokemonImage(id),
              url: pokemon.url,
            };
          });
        }),
      )
      .subscribe({
        next: (data) => {
          this.pokemonList.set(data);
          this.loading.set(false);
        },
      });
  }

  nextPage(): void {
    if (!this.nextUrl()) return;
    this.loadPokemons(this.nextUrl()!);
  }

  prevPage(): void {
    if (!this.prevUrl()) return;
    this.loadPokemons(this.prevUrl()!);
  }
  private extractPokemonId(url: string): number {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
  }

  private getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
