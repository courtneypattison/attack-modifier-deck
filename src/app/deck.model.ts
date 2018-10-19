import { CardType } from './card-type.model';

const Reshuffle = [CardType.Curse, CardType.Bless, CardType.Null, CardType.Double];

export class Deck {

  constructor(private deck: string[]) {
    this.playerDeck = deck;
    this.inPlayDeck = [];
    this.playOnceDeck = [];
    this.currentCard = '';
    this.shuffle();
  }

  private inPlayDeck: string[];
  private playerDeck: string[];
  private playOnceDeck: string[];
  currentCard: string;
  shouldShuffle: boolean;

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private pickRandom() {
    const index = this.getRandomInt(this.size());
    if (index >= this.inPlayDeck.length) {
      const i = index - this.inPlayDeck.length;
      const value = this.playOnceDeck[i];
      this.playOnceDeck.splice(i, 1);
      return value;
    } else {
      const value = this.inPlayDeck[index];
      this.inPlayDeck.splice(index, 1);
      return value;
    }
  }

  size() {
    return this.inPlayDeck.length + this.playOnceDeck.length;
  }

  draw() {
    if (this.size() === 0) {
      this.shuffle();
    }
    this.currentCard = this.pickRandom();
    if (Reshuffle.findIndex(o => this.currentCard.startsWith(o)) >= 0) {
      this.shouldShuffle = true;
    }
  }

  private addplayOnceDeck(currentCard: string) {
    this.playOnceDeck.push(currentCard);
  }

  private addScenariocurrentCard(currentCard: string) {
    this.playerDeck.push(currentCard);
    this.inPlayDeck.push(currentCard);
  }

  shuffle() {
    this.currentCard = '';
    this.shouldShuffle = false;
    this.inPlayDeck = this.playerDeck.slice(0);
  }

  count(currentCard: string) {
    let count = 0;
    for (const i in this.playOnceDeck) {
      if (this.playOnceDeck[i] === currentCard) {
        count++;
      }
    }
    for (const i in this.inPlayDeck) {
      if (this.inPlayDeck[i] === currentCard) {
        count++;
      }
    }
    return count;
  }

  bless() {
    this.addplayOnceDeck(CardType.Bless);
  }

  curse() {
    this.addplayOnceDeck(CardType.Curse);
  }

  addMinusOne() {
    this.addScenariocurrentCard(CardType.ScenarioMinusOne);
  }
}
