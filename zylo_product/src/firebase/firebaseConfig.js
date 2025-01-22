// firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCuhrm1T21WB5HHYRtfSgY3oBFDZNOABEw",
  authDomain: "zylo-tech.firebaseapp.com",
  projectId: "zylo-tech",
  storageBucket: "zylo-tech.appspot.com",
  messagingSenderId: "495405227854",
  appId: "1:495405227854:web:dd2d753a478cae138fc81f",
  measurementId: "G-P2MJ359P7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
