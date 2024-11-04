import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAfxTufe5YBuTWCSWGxb4aseMOXlKWcPeE",
  authDomain: "databasetareas.firebaseapp.com",
  projectId: "databasetareas",
  storageBucket: "databasetareas.firebasestorage.app",
  messagingSenderId: "413379260987",
  appId: "1:413379260987:web:e9b92e844993dfd89b621e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };
