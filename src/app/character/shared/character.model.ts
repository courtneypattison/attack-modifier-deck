import { CharacterClass } from './character-class.model';
import { CharacterPerk } from './character-perk.model';

export interface Character {
  name: string;
  class: CharacterClass;
  perks?: CharacterPerk[];
}
