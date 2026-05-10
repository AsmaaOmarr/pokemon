import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemonListResponse } from '../models/pokemon.model';
import { IPokemonDetails } from '../models/pokemon-details.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(url?: string, limit: number = 42): Observable<IPokemonListResponse> {
    return this.http.get<IPokemonListResponse>(url || `${this.baseUrl}?limit=${limit}`);
  }

  getPokemonById(id: number): Observable<IPokemonDetails> {
    return this.http.get<IPokemonDetails>(`${this.baseUrl}/${id}`);
  }
}
