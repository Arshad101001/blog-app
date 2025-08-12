import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3w9LCadtoiIKQKDZ2y-JqP2zPfiqWZ6g",
  authDomain: "chaiblog-90b95.firebaseapp.com",
  projectId: "chaiblog-90b95",
  storageBucket: "chaiblog-90b95.firebasestorage.app",
  messagingSenderId: "324721396958",
  appId: "1:324721396958:web:49714d5690f4ff6375464f",
  measurementId: "G-4WVG16MK16",
  databaseURL: 'https://chaiblog-90b95-default-rtdb.europe-west1.firebasedatabase.app/'
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);