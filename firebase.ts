// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.NEXT_GOOGLE_API_KEY}`,
  authDomain: 'moovie-e184a.firebaseapp.com',
  projectId: 'moovie-e184a',
  storageBucket: 'moovie-e184a.appspot.com',
  messagingSenderId: '896705831449',
  appId: '1:896705831449:web:4bce39d238910700d84088',
  measurementId: 'G-KV1FHYZ6V1',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics = null;
if (app.name && typeof window !== 'undefined') analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db, analytics };