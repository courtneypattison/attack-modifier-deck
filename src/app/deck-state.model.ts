export interface DeckState {
  characterDeck: string[];
  scenarioDeck: string[];
  inPlayDeck: string[];
  playOnceDeck: string[];
  drawnCard: string;
  shouldShuffle: boolean;
}
