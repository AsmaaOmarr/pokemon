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

  getPokemon(id: number): void {
    this.loading.set(true);
    this.pokemonApi.getPokemonById(id).subscribe({
      next: (data: IPokemonDetails) => {
        this.pokemonDetails.set(data);
        this.loading.set(false);
      },
    });
  }
}
