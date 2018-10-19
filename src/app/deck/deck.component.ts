import { Component, OnInit, Input } from '@angular/core';

import { DeckService } from '../deck.service';
import { DeckState } from '../deck-state.model';

@Component({
  selector: 'amd-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input() characterClass: string;
  deckState: DeckState;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.deckService.getDeckState(this.characterClass).subscribe((deckState: DeckState) => {
      this.deckState = deckState;
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
