// pokemon.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemonListResponse } from '../features/home/models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(url?: string): Observable<IPokemonListResponse> {
    return this.http.get<IPokemonListResponse>(url || `${this.baseUrl}`);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
