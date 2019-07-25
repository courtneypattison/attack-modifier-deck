import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewScenarioComponent } from './new-scenario/new-scenario.component';
import { ScenarioComponent } from './scenario.component';

const scenarioRoutes = [
  { path: 'scenario', component: ScenarioComponent },
  { path: 'new-scenario', component: NewScenarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(scenarioRoutes)],
  exports: [RouterModule],
})
export class ScenarioRoutingModule { }
