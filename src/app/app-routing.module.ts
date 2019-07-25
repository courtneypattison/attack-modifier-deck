import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ScenarioModule } from './scenario/scenario.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/scenario', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    ScenarioModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
