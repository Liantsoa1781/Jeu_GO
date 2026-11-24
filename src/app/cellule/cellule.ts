import { Component, input } from '@angular/core';
import { Action } from '../action';

@Component({
  imports: [],
  selector: 'app-cellule',
  standalone: true,
  styleUrl: './cellule.css',
  templateUrl: './cellule.html',
})
export class Cellule {
  ligne = input(0);
  colonne = input(0);
  couleur = input<'noir' | 'blanc' | null>(null);

  constructor(public actionService: Action){}
  jouer() {
    this.actionService.jouer(this.ligne(), this.colonne());
  }

  retirer(event: MouseEvent) {
    event.preventDefault();

    this.actionService.retirer(
      this.ligne(),
      this.colonne()
    );
  }

}
