// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1YjaPTDAe9klGKXt2StVPnWpf7fKtudk",
  authDomain: "cardbuddies-c2a61.firebaseapp.com",
  databaseURL: "https://cardbuddies-c2a61-default-rtdb.firebaseio.com",
  projectId: "cardbuddies-c2a61",
  storageBucket: "cardbuddies-c2a61.appspot.com",
  messagingSenderId: "503990077726",
  appId: "1:503990077726:web:25150733dce4645527a10f",
  measurementId: "G-7YE072FQZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
console.log(auth);
const googleProvider = new GoogleAuthProvider();
export { app, auth, googleProvider };