import { Component } from '@angular/core';
import { Action } from '../action';
import { Cellule } from '../cellule/cellule';

@Component({
  imports: [Cellule],
  selector: 'app-plateau',
  standalone: true,
  styleUrl: './plateau.css',
  templateUrl: './plateau.html',
})
export class Plateau {
  //Colonnes et lignes pour le tableau d'afichage
  lignesAffichage = Array(8);
  colonnesAffichage = Array(8);

  //Colonnes et lignes pour le tableau d'intéraction
  lignesInteraction = Array(9);
  colonnesInteraction = Array(9);

  constructor(public actionService : Action){

  }
}
