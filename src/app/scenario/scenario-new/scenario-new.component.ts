import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Character } from '../../character/shared/character.model';
import { CharacterService } from '../../character/shared/character.service';
import { ScenarioService } from '../shared/scenario.service';

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

  createScenarioId(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }

  addScenarioNew() {
    console.log(`charcters: ${this.scenarioNewForm.value.characters}`);
    const dateCreated = new Date();
    const scenarioNew = {
      id: this.createScenarioId(dateCreated),
      dateCreated: dateCreated,
      name: this.scenarioNewForm.value.name,
      characters: this.scenarioNewForm.value.characters,
    };
    this.scenarioService.addScenarioNew(scenarioNew);
  }
}
