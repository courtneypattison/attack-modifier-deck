import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CharacterRoutingModule } from './character-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CharacterComponent } from './character.component';
import { CharacterNewComponent } from './character-new/character-new.component';
import { CharacterTableComponent } from './character-table/character-table.component';
import { CharacterEditComponent } from './character-edit/character-edit.component';

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
