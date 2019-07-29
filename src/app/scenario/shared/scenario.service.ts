import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DeckService } from "src/app/deck/shared/deck.service";
import { CharacterService } from "../../character/shared/character.service";
import { Scenario } from "./scenario.model";

@Injectable({
  providedIn: "root"
})
export class ScenarioService {
  constructor(private characterService: CharacterService,private deckService: DeckService) {}

  getCharacterNames(): Observable<string[]> {
    return this.characterService.getCharacterNames();
  }

  getScenarioId(dateCreated: Date): string {
    return `${dateCreated.getFullYear()}-${dateCreated.getMonth() + 1}-${dateCreated.getDate()}-${dateCreated.getHours()}-${dateCreated.getMinutes()}`
  }

  addScenarioNew(scenario: Scenario) {
    for (const characterName of scenario.characterNames) {
      this.deckService.addCharacterDeck(this.getScenarioId(scenario.dateCreated), characterName);
    }
  }
}
