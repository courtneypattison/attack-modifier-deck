import { Character } from "src/app/character/shared/character.model";

export interface Scenario {
  id: string;
  dateCreated: Date;
  name?: string;
  characters?: Character[];
}
