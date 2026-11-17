import { Component, signal } from '@angular/core';
import { Plateau } from './plateau/plateau';

@Component({
  imports: [Plateau],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Jeu_GO');
}
