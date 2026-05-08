import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailsStoreService } from '../../store/pokemon-details-store';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonDetailsStore = inject(PokemonDetailsStoreService);
  protected readonly pokemon = computed(() => this.pokemonDetailsStore.pokemonDetails());
  protected readonly infoCards = computed(() => {
    const pokemon = this.pokemon();
    if (!pokemon) return [];
    return [
      {
        title: 'Height',
        value: pokemon.height,
      },
      {
        title: 'Weight',
        value: pokemon.weight,
      },
      {
        title: 'Experience',
        value: pokemon.base_experience,
      },
    ];
  });

  constructor() {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonDetailsStore.getPokemon(id);
  }
}
