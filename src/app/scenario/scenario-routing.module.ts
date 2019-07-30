import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScenarioComponent } from './scenario.component';
import { ScenarioActiveComponent } from './scenario-active/scenario-active.component';
import { ScenarioNewComponent } from './scenario-new/scenario-new.component';

const scenarioRoutes = [
  { path: 'scenario/new', component: ScenarioNewComponent },
  { path: 'scenario/:id', component: ScenarioActiveComponent },
  { path: 'scenario', component: ScenarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(scenarioRoutes)],
  exports: [RouterModule],
})
export class ScenarioRoutingModule { }
