import { Injectable } from '@angular/core';

import { CardType } from './card-type.model';

const Reshuffle = [CardType.Curse, CardType.Bless, CardType.Null, CardType.Double]; 
const RyansDeck = [
  CardType.Double, CardType.Null,
  "-2",
  "-1", "-1", "-1",   
  "0", "0", "0", "0", "0", "0", 
  "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", 
  "+1, hurt",
  "+2"
];

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor() {
    this.deck = RyansDeck;
    this.inPlay = [];
    this.playOnce = [];
    this.card = '';
  }

  courtney_deck = [
    "+2, muddle", "+2",
    "0", "0",
    "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1",
    CardType.Double,
    CardType.Null,
    "-1", "-1",
    "-2"
    ];

  private inPlay: string[];
  private deck: string[];
  private playOnce: string[];
  card: string;
  shouldShuffle: boolean;

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }	  

  pickRandom() {
    const index = this.getRandomInt(this.size());
    if (index >= this.inPlay.length) {
      const i = index - this.inPlay.length;
      const value = this.playOnce[i];
      this.playOnce.splice(i, 1);
      return value;
    } else {
      const value = this.inPlay[index];
      this.inPlay.splice(index, 1);
      return value;
    }
  }

  size() {
    return this.inPlay.length + this.playOnce.length;
  }

  draw() {
    if (this.size() == 0) {
      this.shuffle();
    }
    this.card = this.pickRandom();
    if (Reshuffle.findIndex(o => this.card.startsWith(o)) >= 0) {
      this.shouldShuffle = true;
    }
  }

  addPlayOnce(card: string) {
    this.playOnce.push(card);
  }

  addScenarioCard(card: string) {
    this.deck.push(card);
    this.inPlay.push(card);
  }

  shuffle() {
    this.card = "";
    this.shouldShuffle = false;
    this.inPlay = this.deck.slice(0);
  }

  count(card: string) {
    let count = 0;
    for (let i in this.playOnce) {
      if (this.playOnce[i] == card) {
        count++;
      }
    }
    for (let i in this.inPlay) {
      if (this.inPlay[i] == card) {
        count++;
      }
    }
    return count;
  }

  bless() {
    this.addPlayOnce(CardType.Bless);
  }

  curse() {
    this.addPlayOnce(CardType.Curse);
  }
}
