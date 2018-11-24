import { Injectable } from '@angular/core';

import { DeckService } from 'src/app/deck/shared/deck.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private deckService: DeckService) { }

  newScenario() {
    this.deckService.addCharacterDeck('Cragheart');
    this.deckService.addCharacterDeck('Spellweaver');
  }
}
