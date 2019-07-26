import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScenarioRoutingModule } from './scenario-routing.module';

import { NewScenarioComponent } from './new-scenario/new-scenario.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';

@NgModule({
  declarations: [
    NewScenarioComponent,
    ScenarioListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScenarioRoutingModule
  ],
  exports: [
    ScenarioListComponent
  ]
})
export class ScenarioModule { }
