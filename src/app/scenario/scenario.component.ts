import { Component, OnInit, Input } from '@angular/core';

import { ScenarioService } from './shared/scenario.service';

@Component({
  selector: 'amd-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  @Input() characters: string[];

  constructor(private scenarioService: ScenarioService) { }

  ngOnInit() {
  }
}
