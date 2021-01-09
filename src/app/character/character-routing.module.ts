import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule } from '@angular/router';

import { CharacterEditComponent } from './character-edit/character-edit.component';
import { CharacterNewComponent } from './character-new/character-new.component';
import { CharacterComponent } from './character.component';

const redirectUnauthorizedToSignup = () => redirectUnauthorizedTo(['signup']);

const characterRoutes = [
  { path: 'character', component: CharacterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
  { path: 'character/new', component: CharacterNewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
  { path: 'character/:id', component: CharacterEditComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
];

@NgModule({
  imports: [RouterModule.forChild(characterRoutes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule { }
