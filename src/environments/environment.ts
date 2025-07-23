import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

export const environment = {
      production: false,
      firebaseConfig: {
            apiKey: "AIzaSyD_f39QSZTPU10GpTmW_5i3lGr4WJWJgMs",
            authDomain: "nhl-website-e5c48.firebaseapp.com",
            projectId: "nhl-website-e5c48",
            storageBucket: "nhl-website-e5c48.firebasestorage.app",
            messagingSenderId: "435306389357",
            appId: "1:435306389357:web:deaf95f44f22e876b18464",
            measurementId: "G-V5LN8YGL83"
      }
};
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);