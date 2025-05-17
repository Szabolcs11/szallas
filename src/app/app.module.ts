import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from './enviroment';

import { FirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
