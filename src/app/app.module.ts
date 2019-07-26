import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CharacterModule } from './character/character.module';
import { ScenarioModule } from './scenario/scenario.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { ScenarioComponent } from './scenario/scenario.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    ScenarioComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    CharacterModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'attack-modifier-deck'),
    AngularFirestoreModule,
    NgSelectModule,
    ScenarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
