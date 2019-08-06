import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { CharacterService } from '../shared/character.service';
import { CharacterClass } from '../shared/character-class.model';
import { CharacterPerk } from '../shared/character-perk.model';
import { CharacterPerks } from '../shared/character-perks.model';

@Component({
  selector: 'amd-character-new',
  templateUrl: './character-new.component.html',
  styleUrls: ['./character-new.component.scss']
})
export class CharacterNewComponent implements OnInit {
  classes: CharacterClass[];
  characterPerks: CharacterPerk[];

  characterNewForm = this.formBuilder.group({
    name: [null, Validators.required],
    class: [null, Validators.required],
    perks: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder, private characterService: CharacterService) { }

  ngOnInit() {
    this.classes = this.characterService.getCharacterClasses();
  }

  addCharacterNew() {
    this.characterService.addCharacterNew(this.characterNewForm.value);
  }

  onClassChange() {
    this.characterPerks = this.characterNewForm.value.class ? CharacterPerks[this.characterNewForm.value.class] : [];
    this.perks.clear();
    for (let perk of this.characterPerks) {
      this.addPerk(perk.activeCount);
    }
  }

  addPerk(activeCount: number) {
    this.perks.push(this.formBuilder.control(activeCount));
  }

  get perks() {
    return this.characterNewForm.get('perks') as FormArray;
  }

}
