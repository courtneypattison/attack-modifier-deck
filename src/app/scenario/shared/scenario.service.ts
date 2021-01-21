import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { Character } from '../../character/shared/character.model';
import { DeckService } from '../../deck/shared/deck.service';
import { Scenario } from './scenario.model';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  constructor(private angularFirestore: AngularFirestore, private deckService: DeckService, private router: Router, private authService: AuthService) { }

  private getScenarioCollectionPath(): string {
    return `${this.authService.getUsername()}/data/scenarios`;
  }

  private getScenarioDocPath(scenarioId: string): string {
    return `${this.getScenarioCollectionPath()}/${scenarioId}`;
  }

  private getScenarioCharacterCollectionPath(scenarioId: string): string {
    return `${this.getScenarioDocPath(scenarioId)}/characters`;
  }

  addScenarioNew(scenario: Scenario) {
    this.angularFirestore
      .doc<Scenario>(this.getScenarioDocPath(scenario.id))
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
      .doc<Scenario>(this.getScenarioDocPath(scenarioId))
      .delete();
  }

  getScenarios(): Observable<Scenario[]> {
    console.log(`getScenarios()`);

    return this.angularFirestore
      .collection<Scenario>(this.getScenarioCollectionPath())
      .valueChanges();
  }

  getScenarioCharacters(scenarioId: string): Promise<Character[]> {
    console.log(`getScenarioCharacters(scenarioId: ${scenarioId})`);

    return this.angularFirestore
      .collection<Character>(this.getScenarioCharacterCollectionPath(scenarioId))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
