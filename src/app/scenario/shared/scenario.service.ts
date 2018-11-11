import { Injectable } from '@angular/core';

import { CragheartDeck, SpellweaverDeck } from '../../deck/shared/character-decks.model';
import { DeckService } from 'src/app/deck/shared/deck.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private deckService: DeckService) { }

  newScenario() {
    this.deckService.addCharacterDeck('Cragheart', CragheartDeck)
      .then(() => {
        this.deckService.shuffle('Cragheart');
        this.deckService.addCharacterDeck('Spellweaver', SpellweaverDeck)
          .then(() => {
            this.deckService.shuffle('Spellweaver');
          });
        });
  }
}
