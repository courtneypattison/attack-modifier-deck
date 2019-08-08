import { Character } from '../../character/shared/character.model';

export interface Scenario {
  id: string;
  dateCreated: Date;
  name?: string;
  characters?: Character[];
}
