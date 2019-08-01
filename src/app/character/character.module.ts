import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CharacterRoutingModule } from './character-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CharacterComponent } from './character.component';
import { NewCharacterComponent } from './new-character/new-character.component';

@NgModule({
  declarations: [
    CharacterComponent,
    NewCharacterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CharacterRoutingModule,
  ]
})
export class CharacterModule { }
