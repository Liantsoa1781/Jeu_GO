import { Injectable, signal } from '@angular/core';

type Cellule = 'noir' | 'blanc' | null;
@Injectable({
  providedIn: 'root'
})
export class Action {
    joueurActuel = signal<'noir' | 'blanc'>('noir');

    plateau = signal<Cellule[][]>(
        Array.from(
        { length: 9 },
        () => Array<Cellule>(9).fill(null)
        )
    );

    jouer(ligne: number, colonne: number) {
        const nouveauPlateau = this.plateau().map(ligne => [...ligne]);

        nouveauPlateau[ligne][colonne] = this.joueurActuel();

        this.plateau.set(nouveauPlateau);
    }
}
