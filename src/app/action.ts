import { Injectable, signal } from '@angular/core';

type Cellule = 'noir' | 'blanc' | null;
@Injectable({
  providedIn: 'root'
})
export class Action {
    joueurActuel = signal<'noir' | 'blanc'>('noir');
    passesConsecutifs = signal(0);
    aJoue = signal(false);
    scoreNoir = signal(0);
    scoreBlanc = signal(0);

    plateau = signal<Cellule[][]>(
        Array.from(
        { length: 9 },
        () => Array<Cellule>(9).fill(null)
        )
    );

    jouer(ligne: number, colonne: number) {
        //Condition pour voir si y a une pierre ou pas sur la cellule
        if (this.plateau()[ligne][colonne] !== null) {
            return;
        }

        if(this.aJoue() == true){
            console.log('Vous avez déjà joué');
            return;
        }

        const nouveauPlateau = this.plateau().map(ligne => [...ligne]);

        nouveauPlateau[ligne][colonne] = this.joueurActuel();

        this.plateau.set(nouveauPlateau);

        //Dire que le joueur a deja jouer
        this.aJoue.set(true);

        //Remettre passesConsecutifs à 0 à chaque tour
        this.passesConsecutifs.set(0);

    }

    //Fonction pour changer de joueur
    changerTour() {
        if (this.joueurActuel() === 'noir') {
            this.joueurActuel.set('blanc');
        } else {
            this.joueurActuel.set('noir');
        }
        this.aJoue.set(false);
    }

    nouvellePartie() {
        this.plateau.set(
            Array.from(
                { length: 9 },
                () => Array<Cellule>(9).fill(null)
            )
        );

        this.joueurActuel.set('noir');
        this.passesConsecutifs.set(0);
        this.aJoue.set(false);
    }

    //Fonction pour passer le tour
    passerTour(){
        this.passesConsecutifs.set(this.passesConsecutifs() + 1);

        if (this.passesConsecutifs() === 2) {
            console.log('La partie est terminée');
            this.nouvellePartie();
            return;
        }

        this.changerTour();
    }

    //Fonction pour retirer une pierre adverse
    retirer(ligne: number, colonne: number) {
        const pierre = this.plateau()[ligne][colonne];

        if (pierre === null) {
            return;
        }

        if (pierre === this.joueurActuel()) {
            return;
        }

        const nouveauPlateau = this.plateau().map(ligne => [...ligne]);

        nouveauPlateau[ligne][colonne] = null;

        this.plateau.set(nouveauPlateau);
    }
}
