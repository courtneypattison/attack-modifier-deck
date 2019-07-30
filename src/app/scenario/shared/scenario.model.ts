import { Character } from "src/app/character/shared/character.model";

export interface Scenario {
  dateCreated: Date;
  name?: string;
  characters: Character[];
}
