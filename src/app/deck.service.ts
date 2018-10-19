import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { CardType } from './card-type.model';
import { CragheartDeck, SpellweaverDeck } from './character-decks.model';
import { DeckState } from './deck-state.model';
import { Reshuffle } from './reshuffle.model';


@Injectable({
  providedIn: 'root'
})
export class DeckService {

  deckState: DeckState;

  constructor(private angularFirestore: AngularFirestore) {
    this.addCharacterDeck('Cragheart', CragheartDeck)
      .then(() => {
        this.shuffle('Cragheart');
      });
    this.addCharacterDeck('Spellweaver', SpellweaverDeck)
      .then(() => {
        this.shuffle('Spellweaver');
      });
  }

  addCharacterDeck(characterClass: string, characterDeck: string[]): Promise<void> {
    console.log(`Adding player deck to firestore:
      characterClass: ${characterClass}
      characterDeck: ${characterDeck}`);

    return this.angularFirestore
      .doc<DeckState>(`players/${characterClass}`)
      .set({
        characterDeck: characterDeck,
        scenarioDeck: characterDeck,
        inPlayDeck: [],
        playOnceDeck: [],
        currentCard: '.',
        shouldShuffle: false,
      });
  }

  getDeckState(characterClass: string): Observable<DeckState> {
    console.log(`Getting deck state:
      characterClass: ${characterClass}`);

    return this.angularFirestore
      .doc<DeckState>(`players/${characterClass}`)
      .valueChanges();
  }

  private updateDeckState(characterClass: string, update: {}): Promise<void> {
    console.log(`Updating deck state:
      characterClass: ${characterClass}
      update: ${JSON.stringify(update)}`);

    return this.angularFirestore
      .doc<DeckState>(`players/${characterClass}`)
      .valueChanges()
      .toPromise()
      .then((deckState: DeckState) => {
        this.angularFirestore
          .doc<DeckState>(`players/${characterClass}`)
          .update(update);
      });
  }

  shuffle(characterClass: string): Promise<void> {
    console.log(`Shuffling player deck:
      characterClass: ${characterClass}`);

    return this.getDeckState(characterClass)
      .toPromise()
      .then((deckState: DeckState) => {
        this.updateDeckState(characterClass, {
          currentCard: '',
          shouldShuffle: false,
          inPlayDeck: deckState.scenarioDeck.slice(0)
        });
      });
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private pickRandom(deckState: DeckState) {
    const index = this.getRandomInt(this.size(deckState));
    if (index >= deckState.inPlayDeck.length) {
      const i = index - deckState.inPlayDeck.length;
      const value = deckState.playOnceDeck[i];
      deckState.playOnceDeck.splice(i, 1);
      return value;
    } else {
      const value = deckState.inPlayDeck[index];
      deckState.inPlayDeck.splice(index, 1);
      return value;
    }
  }

  draw(characterClass: string): Promise<void> {
    return this.getDeckState(characterClass)
      .toPromise()
      .then((deckState: DeckState) => {
        if (this.size(deckState) === 0) {
          console.log(`In play deck is empty,  shuffling`);
          this.shuffle(characterClass);
        }

        deckState.currentCard = this.pickRandom(deckState);
        console.log(`Drawing card:
          characterClass: ${characterClass}
          deckState.currentCard: ${deckState.currentCard}`);

        if (Reshuffle.findIndex(o => deckState.currentCard.startsWith(o)) >= 0) {
          console.log(`Need to reshuffle`);
          this.updateDeckState(characterClass, {
            shouldShuffle: true
          });
        }
      });
  }

  private addplayOnceDeck(characterClass: string, currentCard: string): Promise<void> {
    console.log(`Add play once deck:
      characterClass: ${characterClass}
      currentCard: ${currentCard}`);

    return this.getDeckState(characterClass)
      .toPromise()
      .then((deckState: DeckState) => {
        deckState.playOnceDeck.push(currentCard);
        this.updateDeckState(characterClass, {
          playOnceDeck: deckState.playOnceDeck,
        });
      });
  }

  private addScenarioCard(characterClass: string, currentCard: string): Promise<void> {
    console.log(`Add scenario card:
      characterClass: ${characterClass}
      currentCard: ${currentCard}`);

    return this.getDeckState(characterClass)
      .toPromise()
      .then((deckState: DeckState) => {
        deckState.playOnceDeck.push(currentCard);
        deckState.inPlayDeck.push(currentCard);
        this.updateDeckState(characterClass, {
          playOnceDeck: deckState.playOnceDeck,
          inPlayDeck: deckState.inPlayDeck,
        });
      });
  }

  size(deckState: DeckState): number {
    return deckState.playOnceDeck.length + deckState.inPlayDeck.length;
  }

  bless(characterClass: string) {
    console.log(`Bless:
      characterClass: ${characterClass}`);

    this.addplayOnceDeck(characterClass, CardType.Bless);
  }

  curse(characterClass: string) {
    console.log(`Curse:
      characterClass: ${characterClass}`);

    this.addplayOnceDeck(characterClass, CardType.Curse);
  }

  addMinusOne(characterClass: string) {
    console.log(`Add minus one:
      characterClass: ${characterClass}`);

    this.addScenarioCard(characterClass, CardType.ScenarioMinusOne);
  }

}
