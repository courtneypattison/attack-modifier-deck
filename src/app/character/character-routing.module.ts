import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CharacterNewComponent } from './character-new/character-new.component';
import { CharacterComponent } from './character.component';

const characterRoutes = [
  { path: 'character', component: CharacterComponent },
  { path: 'character/new', component: CharacterNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(characterRoutes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule { }
