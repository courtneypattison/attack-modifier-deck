import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { ScenarioComponent } from './scenario/scenario.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    ScenarioComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'attack-modifier-deck'),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
