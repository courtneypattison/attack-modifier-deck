import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewCharacterComponent } from './new-character/new-character.component';
import { CharacterComponent } from './character.component';

const characterRoutes = [
  { path: 'character', component: CharacterComponent },
  { path: 'new-character', component: NewCharacterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(characterRoutes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule { }
