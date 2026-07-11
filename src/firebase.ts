import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// SECURITY NOTE: This app currently has no authentication layer.
// The Firebase Realtime Database security rules must be configured on the
// Firebase console to restrict access. For production use, you should:
//   1. Enable Firebase Authentication (even anonymous auth adds a layer)
//   2. Set database rules to restrict reads/writes to authenticated users, e.g.:
//      { "rules": { ".read": "auth != null", ".write": "auth != null" } }
//   3. Consider per-user data isolation at /users/$uid/appState
// Without proper rules, anyone with the databaseURL can read/write all data.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDEMO_PLACEHOLDER_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://demo-project-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
