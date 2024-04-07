import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCoHtIi4kkwDCKtOxntNIBvBUMVYIhp7rE",
  authDomain: "chat-110ca.firebaseapp.com",
  projectId: "chat-110ca",
  storageBucket: "chat-110ca.appspot.com",
  messagingSenderId: "909335024365",
  appId: "1:909335024365:web:c8e9e584fd7e26da5db2e4",
  measurementId: "G-D7HPPWBREQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);