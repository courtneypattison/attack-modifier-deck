import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { CharacterPerks } from '../../character/shared/character-perks.model';
import { Character } from '../../character/shared/character.model';
import { CardType } from './card-type.model';
import { DeckState } from './deck-state.model';
import { Reshuffle } from './reshuffle.model';
import { StandardAttackModifierDeck } from './standard-attack-modifier-deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  deckState: DeckState;

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) { }

  private getDeckDocPath(scenarioId: string, characterName: string): string {
    return `/accounts/${this.authService.getUID()}/scenarios/${scenarioId}/characters/${characterName}`;
  }

  private buildDeck(characterClass: string, activePerks: number[]): string[] {
    console.log(`buildDeck(characterClass: ${characterClass})`);

    const cardTypeCounts = { ...StandardAttackModifierDeck };
    const perks = CharacterPerks[characterClass];

    for (const i of Object.keys(perks)) {
      for (const card of Object.keys(perks[i].deckModifier)) {
        const delta =  activePerks[i] * perks[i].deckModifier[card];
        if (card in cardTypeCounts) {
          cardTypeCounts[card] += delta;
        } else {
          cardTypeCounts[card] = delta;
        }
      }
    }

    const deck = [];

    for (const card of Object.keys(cardTypeCounts)) {
      for (let i = 0; i < cardTypeCounts[card]; i++) {
        deck.push(card);
      }
    }

    return deck;
  }

  async addCharacterDeck(scenarioId: string, character: Character): Promise<void> {
    console.log(`addCharacterDeck(): scenarioId: ${scenarioId}, character.name: ${character.name}, character.class: ${character.class}`);
    const characterDeck = this.buildDeck(character.class, character.perks);

    await this.angularFirestore
      .doc<DeckState>(this.getDeckDocPath(scenarioId, character.name))
      .set({
        name: character.name,
        class: character.class,
        characterDeck: characterDeck,
        characterPerks: CharacterPerks[character.class],
        scenarioDeck: characterDeck,
        inPlayDeck: [],
        playOnceDeck: [],
        drawnCard: '.',
        shouldShuffle: false,
      });
    this.shuffle(scenarioId, character.name);
  }

  getDeckState(scenarioId: string, characterName: string): Observable<DeckState> {
    console.log(`getDeckState(scenarioId: ${scenarioId}, characterName: ${characterName})`);

    return this.angularFirestore
      .doc<DeckState>(this.getDeckDocPath(scenarioId, characterName))
      .valueChanges();
  }

  private updateDeckState(scenarioId: string, characterName: string, update: {}) {
    console.log(`updateDeckState(): scenarioId: ${scenarioId}, characterName: ${characterName}, update: ${JSON.stringify(update)}`);

    this.angularFirestore
      .doc<DeckState>(this.getDeckDocPath(scenarioId, characterName))
      .valueChanges()
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        this.angularFirestore
          .doc<DeckState>(this.getDeckDocPath(scenarioId, characterName))
          .update(update);
      });
  }

  shuffle(scenarioId: string, characterName: string) {
    console.log(`shuffle(): scenarioId: ${scenarioId}, characterName: ${characterName}`);

    this.getDeckState(scenarioId, characterName)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        this.updateDeckState(scenarioId, characterName, {
          drawnCard: '.',
          shouldShuffle: false,
          inPlayDeck: deckState.scenarioDeck.slice(0)
        });
      });
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private pickRandomCard(scenarioId: string, characterName: string, deckState: DeckState) {
    console.log(`pickRandomCard(): scenarioId: ${scenarioId}, characterName: ${characterName} deckState: ${JSON.stringify(deckState)}`);
    const size = this.size(deckState);
    if (size === 0) {
      return '.';
    }

    const index = this.getRandomInt(size);
    if (index < deckState.inPlayDeck.length) {
      const value = deckState.inPlayDeck[index];

      deckState.inPlayDeck.splice(index, 1);
      this.updateDeckState(scenarioId, characterName, { inPlayDeck: deckState.inPlayDeck });

      return value;
    } else {
      const i = index - deckState.inPlayDeck.length;
      const value = deckState.playOnceDeck[i];

      deckState.playOnceDeck.splice(i, 1);
      this.updateDeckState(scenarioId, characterName, { playOnceDeck: deckState.playOnceDeck });

      return value;
    }
  }

  drawCard(scenarioId: string, characterName: string) {
    console.log(`draw(): scenarioId: ${scenarioId}, characterName: ${characterName}`);

    return this.getDeckState(scenarioId, characterName)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        if (this.size(deckState) === 0) {
          this.shuffle(scenarioId, characterName);
        }

        const drawnCard = this.pickRandomCard(scenarioId, characterName, deckState);
        this.updateDeckState(scenarioId, characterName, { drawnCard: drawnCard });
        console.log(`Drawing card: characterName: ${characterName} drawnCard: ${drawnCard}`);

        if (Reshuffle.findIndex(o => drawnCard.startsWith(o)) >= 0) {
          console.log(`Need to reshuffle`);
          this.updateDeckState(scenarioId, characterName, { shouldShuffle: true });
        }
      });
  }

  private addplayOnceDeck(scenarioId: string, characterName: string, card: string) {
    console.log(`addPlayOnceDeck(): scenarioId: ${scenarioId}, characterName: ${characterName} card: ${card}`);

    return this.getDeckState(scenarioId, characterName)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        deckState.playOnceDeck.push(card);
        this.updateDeckState(scenarioId, characterName, { playOnceDeck: deckState.playOnceDeck });
      });
  }

  private addScenarioCard(scenarioId: string, characterName: string, card: string) {
    console.log(`addScenarioCard(): scenarioId: ${scenarioId}, characterName: ${characterName} card: ${card}`);

    return this.getDeckState(scenarioId, characterName)
      .pipe(first())
      .subscribe((deckState: DeckState) => {
        deckState.scenarioDeck.push(card);
        deckState.inPlayDeck.push(card);
        this.updateDeckState(scenarioId, characterName, {
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

  bless(scenarioId: string, characterName: string) {
    console.log(`bless(): scenarioId: ${scenarioId}, characterName: ${characterName}`);

    this.addplayOnceDeck(scenarioId, characterName, CardType.Bless);
  }

  curse(scenarioId: string, characterName: string) {
    console.log(`curse(): scenarioId: ${scenarioId}, characterName: ${characterName}`);

    this.addplayOnceDeck(scenarioId, characterName, CardType.Curse);
  }

  addMinusOne(scenarioId: string, characterName: string) {
    console.log(`addMinusOne(): scenarioId: ${scenarioId}, characterName: ${characterName}`);

    this.addScenarioCard(scenarioId, characterName, CardType.ScenarioMinusOne);
  }

}
