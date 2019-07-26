import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ScenarioService } from '../shared/scenario.service';

@Component({
  selector: 'amd-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['./new-scenario.component.scss']
})
export class NewScenarioComponent implements OnInit {
  characterNames: Observable<any[]>;

  newScenarioForm = this.formBuilder.group({
    scenarioName: ['Optional'],
    characterNames: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.characterNames = this.scenarioService.getCharacterNames();
  }

  addNewScenario() {

  }

}
