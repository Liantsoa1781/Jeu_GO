import { Routes } from '@angular/router';
import { Plateau } from './plateau/plateau';
import { Parties } from './parties/parties';

export const routes: Routes = [
  {
    path: 'jeu',
    component: Plateau
  },
  {
    path: 'parties',
    component: Parties
  }
];