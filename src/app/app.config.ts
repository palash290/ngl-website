import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

const firebaseConfig = {
  apiKey: "AIzaSyD_f39QSZTPU10GpTmW_5i3lGr4WJWJgMs",
  authDomain: "nhl-website-e5c48.firebaseapp.com",
  projectId: "nhl-website-e5c48",
  storageBucket: "nhl-website-e5c48.firebasestorage.app",
  messagingSenderId: "435306389357",
  appId: "1:435306389357:web:deaf95f44f22e876b18464",
  measurementId: "G-V5LN8YGL83"
};

  export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
  ]
};
