import { Component, OnInit, Input } from '@angular/core';

import { ScenarioService } from './shared/scenario.service';

@Component({
  selector: 'amd-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {
  @Input() characters: string[];

  constructor(private scenarioService: ScenarioService) { }

  ngOnInit() {
  }

  newScenario() {
    for (const character of this.characters) {
      this.scenarioService.newScenario(character);
    }
  }

}
