import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { CoreModule } from './core/core.module';
import { ScenarioComponent } from './scenario/scenario.component';
import { ScenarioModule } from './scenario/scenario.module';
import { SharedModule } from './shared/shared.module';

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
    AngularFireAuthModule,
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
