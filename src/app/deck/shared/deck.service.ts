import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CardType } from './card-type.model';

import { DeckState } from './deck-state.model';
import { Reshuffle } from './reshuffle.model';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  deckState: DeckState;

  constructor(private angularFirestore: AngularFirestore) { }

  addCharacterDeck(characterClass: string, characterDeck: string[]): Promise<void> {
    console.log(`addCharacterDeck(): characterClass: ${characterClass} characterDeck: ${characterDeck}`);

    return this.angularFirestore
      .doc<DeckState>(`characters/${characterClass}`)
      .set({
        characterDeck: characterDeck,
        scenarioDeck: characterDeck,
        inPlayDeck: [],
        playOnceDeck: [],
        drawnCard: '.',
        shouldShuffle: false,
      });
  }

  getDeckState(characterClass: string): Observable<DeckState> {
    console.log(`getDeckState(): characterClass: ${characterClass}`);

    return this.angularFirestore
      .doc<DeckState>(`characters/${characterClass}`)
      .valueChanges();
  }

  private updateDeckState(characterClass: string, update: {}) {
    console.log(`updateDeckState(): characterClass: ${characterClass} update: ${JSON.stringify(update)}`);

    this.angularFirestore
      .doc<DeckState>(`characters/${characterClass}`)
      .valueChanges()
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        this.angularFirestore
          .doc<DeckState>(`characters/${characterClass}`)
          .update(update);
      });
  }

  shuffle(characterClass: string) {
    console.log(`shuffle(): characterClass: ${characterClass}`);

    this.getDeckState(characterClass)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        this.updateDeckState(characterClass, {
          drawnCard: '.',
          shouldShuffle: false,
          inPlayDeck: deckState.scenarioDeck.slice(0)
        });
      });
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private pickRandomCard(characterClass: string, deckState: DeckState) {
    console.log(`pickRandomCard(): characterClass: ${characterClass} deckState: ${JSON.stringify(deckState)}`);
    const size = this.size(deckState);
    if (size === 0) {
      return '.';
    }

    const index = this.getRandomInt(size);
    if (index < deckState.inPlayDeck.length) {
      const value = deckState.inPlayDeck[index];

      deckState.inPlayDeck.splice(index, 1);
      this.updateDeckState(characterClass, { inPlayDeck: deckState.inPlayDeck });

      return value;
    } else {
      const i = index - deckState.inPlayDeck.length;
      const value = deckState.playOnceDeck[i];

      deckState.playOnceDeck.splice(i, 1);
      this.updateDeckState(characterClass, { playOnceDeck: deckState.playOnceDeck });

      return value;
    }
  }

  drawCard(characterClass: string) {
    console.log(`draw(): characterClass: ${characterClass}`);

    return this.getDeckState(characterClass)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        if (this.size(deckState) === 0) {
          this.shuffle(characterClass);
        }

        const drawnCard = this.pickRandomCard(characterClass, deckState);
        this.updateDeckState(characterClass, {
          drawnCard: drawnCard
        });
        console.log(`Drawing card: characterClass: ${characterClass} drawnCard: ${drawnCard}`);

        if (Reshuffle.findIndex(o => drawnCard.startsWith(o)) >= 0) {
          console.log(`Need to reshuffle`);
          this.updateDeckState(characterClass, {
            shouldShuffle: true
          });
        }
      });
  }

  private addplayOnceDeck(characterClass: string, card: string) {
    console.log(`addPlayOnceDeck(): characterClass: ${characterClass} card: ${card}`);

    return this.getDeckState(characterClass)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        deckState.playOnceDeck.push(card);
        this.updateDeckState(characterClass, { playOnceDeck: deckState.playOnceDeck });
      });
  }

  private addScenarioCard(characterClass: string, card: string) {
    console.log(`addScenarioCard(): characterClass: ${characterClass} card: ${card}`);

    return this.getDeckState(characterClass)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        deckState.scenarioDeck.push(card);
        deckState.inPlayDeck.push(card);
        this.updateDeckState(characterClass, {
          scenarioDeck: deckState.scenarioDeck,
          inPlayDeck: deckState.inPlayDeck,
        });
      });
  }

  size(deckState: DeckState): number {
    const size = deckState.playOnceDeck.length + deckState.inPlayDeck.length;
    console.log(`size: ${size}`);
    return size;
  }

  count(deckState: DeckState, card: string): number {
    let count = 0;
    for (const c of deckState.playOnceDeck) {
      if (c === card) {
        count++;
      }
    }
    for (const c of deckState.scenarioDeck) {
      if (c === card) {
        count++;
      }
    }
    return count;
  }

  getAddInValue(deckState: DeckState, cardType: CardType): string {
    const count = this.count(deckState, cardType);
    return `${cardType} ${count > 0 ? `(${count})` : ''}`;
  }

  bless(characterClass: string) {
    console.log(`bless(): characterClass: ${characterClass}`);

    this.addplayOnceDeck(characterClass, CardType.Bless);
  }

  curse(characterClass: string) {
    console.log(`curse(): characterClass: ${characterClass}`);

    this.addplayOnceDeck(characterClass, CardType.Curse);
  }

  addMinusOne(characterClass: string) {
    console.log(`addMinusOne(): characterClass: ${characterClass}`);

    this.addScenarioCard(characterClass, CardType.ScenarioMinusOne);
  }

}
