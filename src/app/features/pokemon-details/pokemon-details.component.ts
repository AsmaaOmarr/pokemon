import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetailsStoreService } from '../../store/pokemon-details-store';
import { NgIcon, provideIcons, provideNgIconsConfig } from "@ng-icons/core";
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  imports: [NgIcon],
  providers: [provideIcons({ heroArrowLeft }), provideNgIconsConfig({ size: '1.2em' })],
})
export class PokemonDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
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

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
