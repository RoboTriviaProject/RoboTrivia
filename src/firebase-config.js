// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCP4caubbXyGssrVpfPUXMwwOcnRYkpRY4',
  authDomain: 'robo-trivia.firebaseapp.com',
  projectId: 'robo-trivia',
  storageBucket: 'robo-trivia.appspot.com',
  messagingSenderId: '48853169042',
  appId: '1:48853169042:web:b9af8d919908816ee5074b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// With this we have a connection to our firestore database
export const db = getFirestore(app);
