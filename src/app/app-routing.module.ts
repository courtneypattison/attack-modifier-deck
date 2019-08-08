import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterModule } from './character/character.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ScenarioModule } from './scenario/scenario.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/scenario', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CharacterModule,
    ScenarioModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
