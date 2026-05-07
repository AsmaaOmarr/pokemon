import { Component, input, OnInit } from '@angular/core';
import { IPokemon } from '../../../features/home/models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent implements OnInit {

  pokemon = input<IPokemon>();

  constructor() {}

  ngOnInit() {}
}
