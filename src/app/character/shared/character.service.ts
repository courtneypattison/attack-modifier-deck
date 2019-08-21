import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { CharacterClass } from './character-class.model';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private angularFirestore: AngularFirestore) { }

  private getCharacterDocPath(characterId: string): string {
    return `${this.getCharacterCollectionPath()}${characterId}`;
  }

  private getCharacterCollectionPath(): string {
    return 'id/data/characters/';
  }

  getCharacterId(characterName: string): string {
    return characterName.replace(/\s+/g, '-');
  }

  addCharacterNew(character: Character): Promise<void> {
    console.log(`addCharacter(): character.name: ${character.name}, character.class: ${character.class}`);

    return this.angularFirestore
      .doc<Character>(this.getCharacterDocPath(character.id))
      .set(character);
  }

  editCharacter(characterOld: Character, characterNew: Character): Promise<void> {
    console.log(`editCharacter(characterOld: ${JSON.stringify(characterNew)}, characterNew: ${JSON.stringify(characterNew)})`);

    if (characterOld.name === characterNew.name) {
      return this.angularFirestore
      .doc<Character>(this.getCharacterDocPath(characterNew.id))
      .set(characterNew);
    }

    return this.deleteCharacter(characterOld.id).then(any => {
      return this.addCharacterNew(characterNew);
    });
  }

  getCharacter(characterId: string): Promise<Character> {
    console.log(`getCharacter(characterId: ${characterId})`);

    return this.angularFirestore
      .doc<Character>(this.getCharacterDocPath(characterId))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }

  getAllCharacters(): Observable<Character[]> {
    console.log(`getAllCharacters()`);

    return this.angularFirestore
      .collection<Character>(this.getCharacterCollectionPath())
      .valueChanges();
  }

  getCharacterClass(characterName: string): Promise<CharacterClass> {
    console.log(`getCharacterClass(characterName: ${characterName})`);

    return this.angularFirestore
      .doc<Character>(this.getCharacterDocPath(characterName))
      .valueChanges()
      .pipe(
        first(),
        map((character: Character) => character.class))
      .toPromise();
  }

  getCharacterClasses(): CharacterClass[] {
    console.log(`getCharacterClasses()`);

    return Object.values(CharacterClass);
  }

  deleteCharacter(characterId: string): Promise<void> {
    console.log(`deleteCharacter(characterId: ${characterId})`);

    return this.angularFirestore
      .doc<Character>(this.getCharacterDocPath(characterId))
      .delete();
  }
}
