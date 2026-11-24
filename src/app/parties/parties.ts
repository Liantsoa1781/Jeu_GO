import { Component } from '@angular/core';
import { Action } from '../action';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './parties.html',
  styleUrl: './parties.css'
})
export class Parties {

  parties: any[] = [];

  constructor(
    public actionService: Action,
    private router: Router
  ) {
    this.chargerListe();
  }

  chargerListe() {
    const partiesSauvegardees = localStorage.getItem('parties');

    if (partiesSauvegardees !== null) {
      this.parties = JSON.parse(partiesSauvegardees);
    }
  }

  chargerPartie(partie: any) {
    this.actionService.chargerPartie(partie);

    this.router.navigate(['/jeu']);
  }

  supprimerPartie(id: number) {
    //Recuperer la partie avec l'id different de ce que je veux supprimer
    this.parties = this.parties.filter(partie => partie.id !== id);

    localStorage.setItem(
      'parties',
      JSON.stringify(this.parties)
    );
  }
}