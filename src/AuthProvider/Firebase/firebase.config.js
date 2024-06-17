// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALBeDFlu0zv3rjmlPFbtCpXN11TsCIEZk",
  authDomain: "volunteer-project-71857.firebaseapp.com",
  projectId: "volunteer-project-71857",
  storageBucket: "volunteer-project-71857.appspot.com",
  messagingSenderId: "1025476357373",
  appId: "1:1025476357373:web:2a72ebdd668d14fcd0e294"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 export default auth;