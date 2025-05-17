import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "webtervszallas", appId: "1:245673555734:web:b9fb42a65bc6d0186cc237", storageBucket: "webtervszallas.firebasestorage.app", apiKey: "AIzaSyCN8FG4Yw_3PX-T6AnZ2wZ_w35yUcPvGis", authDomain: "webtervszallas.firebaseapp.com", messagingSenderId: "245673555734", measurementId: "G-50GEWYF3FK" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
