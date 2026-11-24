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

        if (this.plateau()[ligne][colonne] !== null) {
            return;
        }

        const nouveauPlateau = this.plateau().map(ligne => [...ligne]);

        nouveauPlateau[ligne][colonne] = this.joueurActuel();

        this.plateau.set(nouveauPlateau);
    }

    changerJoueur() {
        if (this.joueurActuel() === 'noir') {
            this.joueurActuel.set('blanc');
        } else {
            this.joueurActuel.set('noir');
        }
    }
}
