import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { CharacterService } from '../shared/character.service';
import { CharacterClass } from '../shared/character-class.model';
import { CharacterPerk } from '../shared/character-perk.model';
import { CharacterPerks } from '../shared/character-perks.model';

@Component({
  selector: 'amd-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {
  classes: CharacterClass[];
  characterPerks: CharacterPerk[];

  newCharacterForm = this.formBuilder.group({
    name: [null, Validators.required],
    class: [null, Validators.required],
    perks: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder, private characterService: CharacterService) { }

  ngOnInit() {
    this.classes = this.characterService.getCharacterClasses();
  }

  addNewCharacter() {
    this.characterService.addNewCharacter(this.newCharacterForm.value);
  }

  onClassChange() {
    this.characterPerks = this.newCharacterForm.value.class ? CharacterPerks[this.newCharacterForm.value.class] : [];
    this.perks.clear();
    for (let perk of this.characterPerks) {
      this.addPerk(perk.activeCount);
    }
  }

  addPerk(activeCount: number) {
    this.perks.push(this.formBuilder.control(activeCount));
  }

  get perks() {
    return this.newCharacterForm.get('perks') as FormArray;
  }

}
