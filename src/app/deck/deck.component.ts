import { Component, OnInit, Input } from '@angular/core';

import { CardType } from '../card-type.model';

import { Deck } from '../deck.model';

const RyansDeck = [
  CardType.Double, CardType.Null,
  "-2",
  "-1", "-1", "-1",   
  "0", "0", "0", "0", "0", "0", 
  "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", 
  "+1, hurt",
  "+2"
];

const CourtneysDeck = [
  "+2, muddle", "+2",
  "0", "0",
  "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1",
  CardType.Double,
  CardType.Null,
  "-1", "-1",
  "-2"
  ];

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.deck = new Deck(this.playerId === 'Courtney' ? CourtneysDeck : RyansDeck);
    this.update();
  }

  @Input() playerId: string;
  card: string;
  shouldShuffle: string;
  cursed: string;
  blessed: string;
  deck: Deck;


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
  
  update() {
    this.card = this.deck.card;
    this.shouldShuffle = this.deck.shouldShuffle ? 'refresh' : '';
    this.update_bless();
    this.update_curse();
  }

  update_bless() {
    const count = this.deck.count(CardType.Bless);
    this.blessed = "Bless" + (count > 0 ? " (" + String(count) + ")" : '');
  }

  update_curse() {
    const count = this.deck.count(CardType.Curse);
    this.cursed = "Curse" + (count > 0 ? " (" + String(count) + ")" : '');
  }
}
