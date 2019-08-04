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
    name: null,
    characters: ['', Validators.required]
  });

  constructor(private characterService: CharacterService, private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.characters = this.characterService.getAllCharacters();
  }

  createScenarioId(dateCreated: Date): string {
    return `${dateCreated.getFullYear()}-${dateCreated.getMonth() + 1}-${dateCreated.getDate()}-${dateCreated.getHours()}-${dateCreated.getMinutes()}-${dateCreated.getSeconds()}`
  }

  addScenarioNew() {
    console.log(`charcters: ${this.scenarioNewForm.value.characters}`);
    const dateCreated = new Date();
    const scenarioNew = {
      id: this.createScenarioId(dateCreated),
      dateCreated: dateCreated,
      name: this.scenarioNewForm.value.name,
      characters: this.scenarioNewForm.value.characters,
    }
    this.scenarioService.addScenarioNew(scenarioNew);
  }
}
