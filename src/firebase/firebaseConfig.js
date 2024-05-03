import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8W2riLGNtpm5W_NemvrC7jp8sLbBB9fw",
  authDomain: "crud-nextjs-project.firebaseapp.com",
  databaseURL: "https://crud-nextjs-project-default-rtdb.firebaseio.com",
  projectId: "crud-nextjs-project",
  storageBucket: "crud-nextjs-project.appspot.com",
  messagingSenderId: "537553181764",
  appId: "1:537553181764:web:8d2523f25f84f987823011",
  measurementId: "G-5B2XEJ0BT6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db };
export { auth };