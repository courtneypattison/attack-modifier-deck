import { CharacterClass } from './character-class.model';
import { CharacterPerk } from './character-perk.model';

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  perks?: number[];
}
