import { Injectable, inject, signal } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsStoreService {
  private readonly pokemonApi = inject(PokemonApiService);

  loading = signal(false);

  getPokemon(id: number): void {
    this.loading.set(true);
    this.pokemonApi.getPokemonById(Number(id))
      .subscribe({
        next: (data) => {
          console.log('detailss', data);
          this.loading.set(false);
        },
      });
  }

  private getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
