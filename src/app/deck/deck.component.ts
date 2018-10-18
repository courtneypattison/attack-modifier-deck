import { Component, OnInit, Input } from '@angular/core';

import { CardType } from '../card-type.model';
import { CourtneysDeck, RyansDeck } from '../player-decks.model';

import { Deck } from '../deck.model';

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() playerId: string;
  card: string;
  size: number;
  shouldShuffle: string;
  cursed: string;
  blessed: string;
  minusOne: string;
  deck: Deck;

  constructor() { }

  ngOnInit() {
    this.deck = new Deck(this.playerId === 'Courtney' ? CourtneysDeck : RyansDeck);
    this.update();
  }

  draw() {
    this.deck.draw();
    this.update();
  }

  shuffle() {
    this.deck.shuffle();
    this.update();
  }

  curse() {
    this.deck.curse();
    this.update();
  }

  bless() {
    this.deck.bless();
    this.update();
  }

  addMinusOne() {
    this.deck.addMinusOne();
    this.update();
  }

  update() {
    this.card = this.deck.card === '' ? '.' : this.deck.card;
    this.size = this.deck.size();
    this.shouldShuffle = this.deck.shouldShuffle ? 'refresh' : '';
    this.blessed = this.updateAddIn(CardType.Bless);
    this.cursed = this.updateAddIn(CardType.Curse);
    this.minusOne = this.updateAddIn(CardType.ScenarioMinusOne);
  }

  updateAddIn(cardType: CardType): string {
    const count = this.deck.count(cardType);
    return `${cardType} ${count > 0 ? `(${count})` : ''}`;
  }
}
