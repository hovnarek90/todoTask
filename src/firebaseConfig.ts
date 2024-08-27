// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOlKOIO2tH0ybBBTLWF5P7SyDriBIIAYE",
  authDomain: "todolist-91d19.firebaseapp.com",
  projectId: "todolist-91d19",
  storageBucket: "todolist-91d19.appspot.com",
  messagingSenderId: "820726834632",
  appId: "1:820726834632:web:0d6c17423ba348b9354cfd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
