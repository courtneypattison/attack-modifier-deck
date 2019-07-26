import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DeckService } from "src/app/deck/shared/deck.service";
import { Character } from "src/app/character/shared/character.model";
import { CharacterService } from "../../character/shared/character.service";

@Injectable({
  providedIn: "root"
})
export class ScenarioService {
  constructor(
    private characterService: CharacterService,
    private deckService: DeckService
  ) {}

  getCharacterNames(): Observable<Character[]> {
    return this.characterService.getCharacters();
  }

  addNewScenario(characterClass: string) {
    this.deckService.addCharacterDeck(characterClass);
  }
}
