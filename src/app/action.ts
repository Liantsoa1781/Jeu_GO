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

        //Condition pour retirer que celui de l'adversaire
        if (pierre === this.joueurActuel()) {
            return;
        }

        //Condition pour mettre en place le score
        if(this.joueurActuel() == 'noir'){
            this.scoreNoir.set(this.scoreNoir() + 1);
        }
        else{
            this.scoreBlanc.set(this.scoreBlanc() + 1);
        }

        const nouveauPlateau = this.plateau().map(ligne => [...ligne]);

        nouveauPlateau[ligne][colonne] = null;

        this.plateau.set(nouveauPlateau);
    }

    sauvegarderPartie(nom: string) {
        if (nom.trim() === '') {
            return;
        }

        const partie = {
            id: Date.now(),
            nom: nom,
            plateau: this.plateau(),
            joueurActuel: this.joueurActuel(),
            passesConsecutifs: this.passesConsecutifs(),
            aJoue: this.aJoue(),
            scoreNoir: this.scoreNoir(),
            scoreBlanc: this.scoreBlanc()
        };

        // console.log("partie:", partie);

        const partiesSauvegardees = localStorage.getItem('parties');

        // console.log(partiesSauvegardees);

        let parties = [];

        if (partiesSauvegardees !== null) {
            parties = JSON.parse(partiesSauvegardees);
        }

        parties.push(partie);

        localStorage.setItem('parties', JSON.stringify(parties));
    }

    chargerPartie(partie: any) {
        this.plateau.set(partie.plateau);
        this.joueurActuel.set(partie.joueurActuel);
        this.passesConsecutifs.set(partie.passesConsecutifs);
        this.aJoue.set(partie.aJoue);
        this.scoreNoir.set(partie.scoreNoir);
        this.scoreBlanc.set(partie.scoreBlanc);
    }
}
