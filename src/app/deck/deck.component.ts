import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { CardType } from './shared/card-type.model';
import { DeckService } from './shared/deck.service';
import { DeckState } from './shared/deck-state.model';
import { Character } from '../character/shared/character.model';

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @Input() character: Character;
  @Input() scenarioId: string
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
      name: this.character.name,
      class: this.character.class,
      characterDeck: [],
      characterPerks: [],
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
    this.deckService.getDeckState(this.scenarioId, this.character.name).subscribe((deckState: DeckState) => {
      this.deckState = deckState;
      this.activeDeckSize = this.deckService.size(deckState);
      this.blessButtonValue = this.deckService.getAddInValue(deckState, CardType.Bless);
      this.curseButtonValue = this.deckService.getAddInValue(deckState, CardType.Curse);
      this.minusOneButtonValue = this.deckService.getAddInValue(deckState, CardType.ScenarioMinusOne);
    });
  }

  drawCard() {
    this.deckService.drawCard(this.scenarioId, this.character.name);
    this.clickAnimation = true;
    delay(1000).then(() => this.clickAnimation = false);
  }

  shuffle() {
    this.deckService.shuffle(this.scenarioId, this.character.name);
  }

  curse() {
    this.deckService.curse(this.scenarioId, this.character.name);
  }

  bless() {
    this.deckService.bless(this.scenarioId, this.character.name);
  }

  addMinusOne() {
    this.deckService.addMinusOne(this.scenarioId, this.character.name);
  }

  editPerks() {

  }
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
