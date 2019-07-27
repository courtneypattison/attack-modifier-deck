import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

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

  getCharacterClasses(): CharacterClass[] {
    console.log(`getCharacterClasses()`);

    return Object.values(CharacterClass);
  }
}
