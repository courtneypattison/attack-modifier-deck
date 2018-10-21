import { Component, OnInit, Input } from '@angular/core';

import { CardType } from './shared/card-type.model';
import { CragheartDeck, SpellweaverDeck } from './shared/character-decks.model';
import { DeckService } from './shared/deck.service';
import { DeckState } from './shared/deck-state.model';

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() characterClass: string;
  deckState: DeckState;
  activeDeckSize: number;
  blessButtonValue: string;
  curseButtonValue: string;
  minusOneButtonValue: string;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.deckState = {
      characterDeck: [],
      scenarioDeck: [],
      inPlayDeck: [],
      playOnceDeck: [],
      drawnCard: '.',
      shouldShuffle: false,
    };
    this.curseButtonValue = 'Curse';
    this.blessButtonValue = 'Bless';
    this.minusOneButtonValue = '-1*';

    this.deckService.addCharacterDeck('Cragheart', CragheartDeck)
      .then(() => {
        this.deckService.shuffle('Cragheart');
        this.deckService.addCharacterDeck('Spellweaver', SpellweaverDeck)
          .then(() => {
            this.deckService.shuffle('Spellweaver');
            this.deckService.getDeckState(this.characterClass)
              .subscribe((deckState: DeckState) => {
                this.deckState = deckState;
                this.activeDeckSize = this.deckService.size(deckState);
                this.blessButtonValue = this.deckService.getAddInValue(deckState, CardType.Bless);
                this.curseButtonValue = this.deckService.getAddInValue(deckState, CardType.Curse);
                this.minusOneButtonValue = this.deckService.getAddInValue(deckState, CardType.ScenarioMinusOne);
              });
          });
      });
  }

  draw() {
    this.deckService.draw(this.characterClass);
  }

  shuffle() {
    this.deckService.shuffle(this.characterClass);
  }

  curse() {
    this.deckService.curse(this.characterClass);
  }

  bless() {
    this.deckService.bless(this.characterClass);
  }

  addMinusOne() {
    this.deckService.addMinusOne(this.characterClass);
  }
}
