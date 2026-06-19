// 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBANgzG2rW8QGdhTcd0ceL7PHwAk4bYfDg",
  authDomain: "globalinfortv24-3f126.firebaseapp.com",
  projectId: "globalinfortv24-3f126",
  storageBucket: "globalinfortv24-3f126.firebasestorage.app",
  messagingSenderId: "67879794253",
  appId: "1:67879794253:web:d8df22d18a553a51a90e04"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
