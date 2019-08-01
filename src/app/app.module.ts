import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CharacterModule } from './character/character.module';
import { ScenarioModule } from './scenario/scenario.module';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ScenarioComponent } from './scenario/scenario.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CharacterModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'attack-modifier-deck'),
    AngularFirestoreModule,
    ScenarioModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
