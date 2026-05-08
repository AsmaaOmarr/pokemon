import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./features/pokemon-details/pokemon-details.component').then((m) => m.PokemonDetailsComponent),
  },
  { path: '**', redirectTo: 'home' },
];
