import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { Character } from '../../character/shared/character.model';
import { DeckService } from "src/app/deck/shared/deck.service";
import { Scenario } from "./scenario.model";

@Injectable({
  providedIn: "root"
})
export class ScenarioService {
  constructor(private angularFirestore: AngularFirestore, private deckService: DeckService, private router: Router) {}

  createScenarioId(dateCreated: Date): string {
    return `${dateCreated.getFullYear()}-${dateCreated.getMonth() + 1}-${dateCreated.getDate()}-${dateCreated.getHours()}-${dateCreated.getMinutes()}-${dateCreated.getSeconds()}`
  }

  addScenarioNew(scenario: Scenario) {
    const id = this.createScenarioId(scenario.dateCreated);

    for (const character of scenario.characters) {
      this.deckService.addCharacterDeck(id, character);
    }

    this.router.navigate(['/scenario', id]);
  }

  getScenarioCharacters(scenarioId: string): Promise<Character[]> {
    console.log(`getScenarioCharacters(scenarioId: ${scenarioId})`);

    return this.angularFirestore
      .collection<Character>(`id/scenarios/${scenarioId}`)
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
