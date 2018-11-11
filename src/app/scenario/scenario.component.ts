import { Component, OnInit } from '@angular/core';

import { ScenarioService } from './shared/scenario.service';

@Component({
  selector: 'amd-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  constructor(private scenarioService: ScenarioService) { }

  ngOnInit() {
  }

  newScenario() {
    this.scenarioService.newScenario();
  }

}
