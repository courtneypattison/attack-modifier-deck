import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
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
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'attack-modifier-deck'),
    AngularFirestoreModule,
    ScenarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
