import { Perk } from './perk.model';

export interface DeckState {
  characterDeck: string[];
  characterPerks: Perk[];
  scenarioDeck: string[];
  inPlayDeck: string[];
  playOnceDeck: string[];
  drawnCard: string;
  shouldShuffle: boolean;
}
