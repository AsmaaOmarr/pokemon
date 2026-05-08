import { Component, computed, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonStoreService } from '../../store/pokemon-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [SearchBarComponent, PokemonCardComponent],
})
export class HomeComponent implements OnInit {
  private pokemonStore = inject(PokemonStoreService);
  private router = inject(Router);

  protected readonly pokemonList = computed(() => this.pokemonStore.pokemonList());
  protected readonly pokemonCount = computed(() => this.pokemonStore.pokemonCount());
  protected readonly prevUrl = computed(() => this.pokemonStore.prevUrl());
  protected readonly nextUrl = computed(() => this.pokemonStore.nextUrl())

  ngOnInit() {
    this.pokemonStore.loadPokemons();
  }

  navigateToPokemonDetails(id : number) {
    this.router.navigate(['/pokemon', id]);
  }
  
  nextPage() {
    this.pokemonStore.nextPage();
  }

  prevPage() {
    this.pokemonStore.prevPage();
  }
  handleSearch(query: string) {
    console.log('Search query:', query);
  }
}
