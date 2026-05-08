import { Injectable, inject, signal } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { IPokemonDetails } from '../models/pokemon-details.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsStoreService {
  private readonly pokemonApi = inject(PokemonApiService);

  pokemonDetails = signal<IPokemonDetails | null>(null);
  loading = signal(false);
  pokemonCache = new Map<number, IPokemonDetails>();

  getPokemon(id: number): void {
    if (this.pokemonCache.has(id)) {
      this.pokemonDetails.set(this.pokemonCache.get(id)!);
      return;
    }
    this.loading.set(true);
    this.pokemonApi.getPokemonById(id).subscribe({
      next: (data: IPokemonDetails) => {
        this.pokemonDetails.set(data);
        this.pokemonCache.set(id, data);
        this.loading.set(false);
      },
    });
  }
}
