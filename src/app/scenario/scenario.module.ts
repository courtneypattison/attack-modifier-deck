import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScenarioRoutingModule } from './scenario-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DeckComponent } from '../deck/deck.component';
import { ScenarioNewComponent } from './scenario-new/scenario-new.component';
import { ScenarioTableComponent } from './scenario-table/scenario-table.component';
import { ScenarioActiveComponent } from './scenario-active/scenario-active.component';

@NgModule({
  declarations: [
    DeckComponent,
    ScenarioNewComponent,
    ScenarioTableComponent,
    ScenarioActiveComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScenarioRoutingModule,
    SharedModule,
  ],
  exports: [
    ScenarioTableComponent,
  ]
})
export class ScenarioModule { }
