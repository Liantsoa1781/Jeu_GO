import { Component, input } from '@angular/core';

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
}
