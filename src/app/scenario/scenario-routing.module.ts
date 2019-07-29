import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScenarioComponent } from './scenario.component';
import { ScenarioNewComponent } from './scenario-new/scenario-new.component';

const scenarioRoutes = [
  { path: 'scenario', component: ScenarioComponent },
  { path: 'scenario-new', component: ScenarioNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(scenarioRoutes)],
  exports: [RouterModule],
})
export class ScenarioRoutingModule { }
