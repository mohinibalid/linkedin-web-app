import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCUL8A-cLO3s6mWbZL42dI4qmiQLj1MDc",
  authDomain: "linkedin-clone-d9828.firebaseapp.com",
  projectId: "linkedin-clone-d9828",
  storageBucket: "linkedin-clone-d9828.firebasestorage.app",
  messagingSenderId: "625782776438",
  appId: "1:625782776438:web:cade29e81b14648be5b557",
  measurementId: "G-K3R06Z6LLX"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
