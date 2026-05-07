import { Component, inject, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { PokemonCardComponent } from "../../shared/components/pokemon-card/pokemon-card.component";
import { PokemonStoreService } from '../../services/pokemon-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [SearchBarComponent, PokemonCardComponent],
})
export class HomeComponent implements OnInit {
  protected pokemonStore = inject(PokemonStoreService);

  ngOnInit() {
    this.pokemonStore.loadPokemons();
  }

  handleSearch(query: string) {
    console.log('Search query:', query);
  }

}
