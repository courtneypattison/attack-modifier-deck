import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { Character } from '../../character/shared/character.model';
import { ScenarioService } from '../shared/scenario.service';

@Component({
  selector: 'amd-scenario-active',
  templateUrl: './scenario-active.component.html',
})
export class ScenarioActiveComponent implements OnInit {
  characters: Promise<Character[]>;
  scenarioId: string;

  constructor(private route: ActivatedRoute, private scenarioService: ScenarioService) { }

  async ngOnInit() {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
        this.scenarioId = params.get('id');
        this.characters = this.scenarioService.getScenarioCharacters(this.scenarioId);
      }
    );
  }

}
