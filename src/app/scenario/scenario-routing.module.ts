import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule } from '@angular/router';

import { ScenarioActiveComponent } from './scenario-active/scenario-active.component';
import { ScenarioNewComponent } from './scenario-new/scenario-new.component';
import { ScenarioComponent } from './scenario.component';

const redirectUnauthorizedToSignup = () => redirectUnauthorizedTo(['signup']);

const scenarioRoutes = [
  { path: 'scenario/new', component: ScenarioNewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
  { path: 'scenario/:id', component: ScenarioActiveComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
  { path: 'scenario', component: ScenarioComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignup } },
];

@NgModule({
  imports: [RouterModule.forChild(scenarioRoutes)],
  exports: [RouterModule],
})
export class ScenarioRoutingModule { }
