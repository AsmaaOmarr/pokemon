import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailsStoreService } from './pokemon-details-store';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly pokemonDetailsStore = inject(PokemonDetailsStoreService);

  constructor() { }

  ngOnInit() {
     const id = Number(this.route.snapshot.paramMap.get('id'));
     this.pokemonDetailsStore.getPokemon(id);
  }
}
