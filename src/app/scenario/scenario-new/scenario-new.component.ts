import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ScenarioService } from '../shared/scenario.service';

@Component({
  selector: 'amd-scenario-new',
  templateUrl: './scenario-new.component.html',
  styleUrls: ['./scenario-new.component.scss']
})
export class ScenarioNewComponent implements OnInit {
  characterNames: Observable<string[]>;

  scenarioNewForm = this.formBuilder.group({
    scenarioName: null,
    characterNames: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.characterNames = this.scenarioService.getCharacterNames();
  }

  addScenarioNew() {
    const scenarioNew = {
      dateCreated: new Date(),
      scenarioName: this.scenarioNewForm.value.scenarioName,
      characterNames: this.scenarioNewForm.value.characterNames
    }
    this.scenarioService.addScenarioNew(scenarioNew);
  }

}
