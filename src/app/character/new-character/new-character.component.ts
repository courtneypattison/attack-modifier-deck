import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CharacterService } from '../shared/character.service';
import { CharacterClass } from '../shared/character-class.model';

@Component({
  selector: 'amd-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {
  classes: CharacterClass[];

  newCharacterForm = this.formBuilder.group({
    name: [null, Validators.required],
    class: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private characterService: CharacterService) { }

  ngOnInit() {
    this.classes = this.characterService.getCharacterClasses();
  }

  addNewCharacter() {
    this.characterService.addNewCharacter(this.newCharacterForm.value);
  }

}
