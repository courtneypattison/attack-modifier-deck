import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { ScenarioRoutingModule } from './scenario-routing.module';

import { ScenarioNewComponent } from './scenario-new/scenario-new.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';

@NgModule({
  declarations: [
    ScenarioNewComponent,
    ScenarioListComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ScenarioRoutingModule
  ],
  exports: [
    ScenarioListComponent
  ]
})
export class ScenarioModule { }
