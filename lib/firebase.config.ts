import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByLztAKWTGQi-yQDhEz4grr6O05blnwBQ",
  authDomain: "mediqueue-aa52a.firebaseapp.com",
  projectId: "mediqueue-aa52a",
  storageBucket: "mediqueue-aa52a.firebasestorage.app",
  messagingSenderId: "442880664686",
  appId: "1:442880664686:web:85870505c49613a80a727f",
  measurementId: "G-CQPWMY1T2B",
};

const app = initializeApp(firebaseConfig);

export default app;