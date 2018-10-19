export interface DeckState {
  characterDeck: string[];
  scenarioDeck: string[];
  inPlayDeck: string[];
  playOnceDeck: string[];
  currentCard: string;
  shouldShuffle: boolean;
}
