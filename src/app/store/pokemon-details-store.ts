import { Injectable, inject, signal } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { IPokemonDetails } from '../models/pokemon-details.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsStoreService {
  private readonly pokemonApi = inject(PokemonApiService);
  private readonly spinner = inject(NgxSpinnerService);

  pokemonDetails = signal<IPokemonDetails | null>(null);
  pokemonCache = new Map<number, IPokemonDetails>();

  getPokemon(id: number): void {
    if (this.pokemonCache.has(id)) {
      this.pokemonDetails.set(this.pokemonCache.get(id)!);
      return;
    }
    this.spinner.show();
    this.pokemonApi.getPokemonById(id)
    .subscribe({
      next: (data: IPokemonDetails) => {
        this.pokemonDetails.set(data);
        this.pokemonCache.set(id, data);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }
}
