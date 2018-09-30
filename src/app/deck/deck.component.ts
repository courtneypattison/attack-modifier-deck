import { Component, OnInit, Input } from '@angular/core';

import { CardType } from '../card-type.model';

import { DeckService } from '../deck.service';

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.update();
  }

  @Input() playerId: string;
  card: string;
  shouldShuffle: string;
  cursed: string;
  blessed: string;


  draw() {
    this.deckService.draw();
    this.update();
  }
  
  shuffle() {
    this.deckService.shuffle();
    this.update();
  }

  curse() {
    this.deckService.curse();
    this.update();
  }

  bless() {
    this.deckService.bless();
    this.update();
  }
  
  update() {
    this.card = this.deckService.card;
    this.shouldShuffle = this.deckService.shouldShuffle ? 'refresh' : '';
    this.update_bless();
    this.update_curse();
  }

  update_bless() {
    const count = this.deckService.count(CardType.Bless);
    this.blessed = "Bless" + (count > 0 ? " (" + String(count) + ")" : '');
  }

  update_curse() {
    const count = this.deckService.count(CardType.Curse);
    this.cursed = "Curse" + (count > 0 ? " (" + String(count) + ")" : '');
  }
}
