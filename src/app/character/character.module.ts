import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CharacterEditComponent } from './character-edit/character-edit.component';
import { CharacterNewComponent } from './character-new/character-new.component';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterTableComponent } from './character-table/character-table.component';
import { CharacterComponent } from './character.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterNewComponent,
    CharacterTableComponent,
    CharacterEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CharacterRoutingModule,
  ]
})
export class CharacterModule { }
