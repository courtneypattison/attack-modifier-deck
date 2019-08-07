import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CharacterEditComponent } from './character-edit/character-edit.component';
import { CharacterNewComponent } from './character-new/character-new.component';
import { CharacterComponent } from './character.component';

const characterRoutes = [
  { path: 'character', component: CharacterComponent },
  { path: 'character/new', component: CharacterNewComponent },
  { path: 'character/:id', component: CharacterEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(characterRoutes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule { }
