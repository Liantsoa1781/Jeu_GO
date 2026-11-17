import { Injectable, signal } from '@angular/core';

type Cellule = 'noir' | 'blanc' | null;
@Injectable({
  providedIn: 'root'
})
export class Action {
    joueurActuel = signal('noir');

    plateau = signal<Cellule[][]>(
        Array.from(
        { length: 9 },
        () => Array<Cellule>(9).fill(null)
        )
    );
}
