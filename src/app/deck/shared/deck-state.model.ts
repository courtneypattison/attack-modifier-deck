import { Perk } from './perk.model';

export interface DeckState {
  name: string;
  class: string;
  characterDeck: string[];
  characterPerks: Perk[];
  scenarioDeck: string[];
  inPlayDeck: string[];
  playOnceDeck: string[];
  drawnCard: string;
  shouldShuffle: boolean;
}
