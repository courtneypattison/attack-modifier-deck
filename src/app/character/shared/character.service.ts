import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Character } from './character.model';
import { CharacterClass } from './character-class.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private angularFirestore: AngularFirestore) { }

  addNewCharacter(character: Character): Promise<void> {
    console.log(`addCharacter(): character.name: ${character.name}, character.class: ${character.class}`);

    return this.angularFirestore
      .doc<Character>(`characters/${character.name}`)
      .set(character);
  }

  getCharacters(): Observable<Character[]> {
    console.log(`getCharacters()`);

    return this.angularFirestore
      .collection<Character>(`characters`)
      .valueChanges();
  }

  getCharacterClass(characterName: string): Promise<CharacterClass> {
    console.log(`getCharacterClass(characterName: ${characterName})`);

    return this.angularFirestore
      .doc<Character>(`characters/${characterName}`)
      .valueChanges()
      .pipe(first(),map((character: Character) => character.class))
      .toPromise();
  }

  getCharacterClasses(): CharacterClass[] {
    console.log(`getCharacterClasses()`);

    return Object.values(CharacterClass);
  }

  getCharacterNames(): Observable<string[]> {
    console.log(`getCharacterNames()`);

    return this.angularFirestore
      .collection<Character>(`characters`)
      .valueChanges()
      .pipe(
        map((characters: Character[]) => {
          let characterNames = [];
          for (let character of characters) {
            characterNames.push(character.name);
          }
          return characterNames;
        })
      );
  }
}
