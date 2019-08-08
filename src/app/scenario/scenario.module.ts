import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DeckComponent } from '../deck/deck.component';
import { SharedModule } from '../shared/shared.module';
import { ScenarioActiveComponent } from './scenario-active/scenario-active.component';
import { ScenarioNewComponent } from './scenario-new/scenario-new.component';
import { ScenarioRoutingModule } from './scenario-routing.module';
import { ScenarioTableComponent } from './scenario-table/scenario-table.component';

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
