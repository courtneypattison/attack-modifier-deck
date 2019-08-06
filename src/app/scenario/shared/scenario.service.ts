import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { Character } from '../../character/shared/character.model';
import { DeckService } from "src/app/deck/shared/deck.service";
import { Scenario } from "./scenario.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ScenarioService {
  constructor(private angularFirestore: AngularFirestore, private deckService: DeckService, private router: Router) { }

  private getScenarioPath(scenarioId: string): string {
    return `id/data/scenarios/${scenarioId}`
  }

  private getScenarioCharactersPath(scenarioId: string): string {
    return `id/data/scenarios/${scenarioId}/characters`;
  }

  addScenarioNew(scenario: Scenario) {
    this.angularFirestore
      .doc<Scenario>(this.getScenarioPath(scenario.id))
      .set({
        id: scenario.id,
        dateCreated: scenario.dateCreated,
        name: scenario.name ? scenario.name : '',
      });

    for (const character of scenario.characters) {
      this.deckService.addCharacterDeck(scenario.id, character);
    }

    this.router.navigate(['/scenario', scenario.id]);
  }

  deleteScenario(scenarioId: string): Promise<void> {
    console.log(`deleteScenario(scenarioId: ${scenarioId})`);

    return this.angularFirestore
      .doc<Scenario>(this.getScenarioPath(scenarioId))
      .delete();
  }

  getScenarios(): Observable<Scenario[]> {
    console.log(`getScenarios()`);

    return this.angularFirestore
      .collection<Scenario>(`id/data/scenarios`)
      .valueChanges()
  }

  getScenarioCharacters(scenarioId: string): Promise<Character[]> {
    console.log(`getScenarioCharacters(scenarioId: ${scenarioId})`);

    return this.angularFirestore
      .collection<Character>(this.getScenarioCharactersPath(scenarioId))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
