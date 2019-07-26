import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'amd-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.scss']
})
export class NewCharacterComponent implements OnInit {
  newCharacterForm = this.formBuilder.group({
    characterName: ['Aaron', Validators.required],
    characterClass: ['Cragheart', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private characterService: CharacterService) { }

  ngOnInit() {
  }

  addNewCharacter() {
    this.characterService.addNewCharacter(this.newCharacterForm.value);
  }

}
