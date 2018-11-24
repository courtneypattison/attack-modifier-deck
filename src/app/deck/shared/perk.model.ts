import { DeckModifier } from './deck-modifier.model';

export interface Perk {
  activeCount: number;
  description: string;
  count: number;
  deckModifier: DeckModifier;
}
