import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ScenarioModule } from './scenario/scenario.module';

const redirectLoggedInToScenario = () => redirectLoggedInTo(['scenario']);

const appRoutes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToScenario } },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    AuthModule,
    CharacterModule,
    ScenarioModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
