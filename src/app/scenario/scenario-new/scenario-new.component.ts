import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { CharacterService } from '../../character/shared/character.service';
import { ScenarioService } from '../shared/scenario.service';
import { Character } from 'src/app/character/shared/character.model';
import { CharacterClass } from 'src/app/character/shared/character-class.model';

@Component({
  selector: 'amd-scenario-new',
  templateUrl: './scenario-new.component.html',
  styleUrls: ['./scenario-new.component.scss']
})
export class ScenarioNewComponent implements OnInit {
  characters: Observable<Character[]>;

  scenarioNewForm = this.formBuilder.group({
    scenarioName: null,
    characters: ['', Validators.required]
  });

  constructor(private characterService: CharacterService, private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.characters = this.characterService.getAllCharacters();
  }

  private extractCharacters(characterStrs: string[]): Character[] {
    return characterStrs.map((characterStr: string) => {
      return {
        name: characterStr.substring(0, characterStr.lastIndexOf("(") - 1),
        class: CharacterClass[characterStr.substring(characterStr.lastIndexOf("(") + 1, characterStr.length - 1)],
      }
    });
  }

  addScenarioNew() {
    const scenarioNew = {
      dateCreated: new Date(),
      scenarioName: this.scenarioNewForm.value.scenarioName,
      characters: this.extractCharacters(this.scenarioNewForm.value.characters),
    }
    this.scenarioService.addScenarioNew(scenarioNew);
  }

}
