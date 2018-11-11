import { Component, OnInit, Input } from '@angular/core';

import { CardType } from './shared/card-type.model';
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
  clickAnimation: boolean;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.setDefaultState();
    this.getDeckState();
  }

  setDefaultState() {
    this.clickAnimation = false;
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
  }

  getDeckState() {
    this.deckService.getDeckState(this.characterClass).subscribe((deckState: DeckState) => {
      this.deckState = deckState;
      this.activeDeckSize = this.deckService.size(deckState);
      this.blessButtonValue = this.deckService.getAddInValue(deckState, CardType.Bless);
      this.curseButtonValue = this.deckService.getAddInValue(deckState, CardType.Curse);
      this.minusOneButtonValue = this.deckService.getAddInValue(deckState, CardType.ScenarioMinusOne);
    });
  }

  drawCard() {
    this.deckService.drawCard(this.characterClass);
    this.clickAnimation = true;
    delay(1000).then(() => this.clickAnimation = false);
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

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
