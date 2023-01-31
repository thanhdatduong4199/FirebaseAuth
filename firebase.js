// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserNonePersistence} from "firebase/auth";
import 'firebase/compat/firestore';
import{
  getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGk3qP_uKMHbswCucWBLmnsYS-ELA_vY8",
  authDomain: "fir-auth-7b7e0.firebaseapp.com",
  projectId: "fir-auth-7b7e0",
  storageBucket: "fir-auth-7b7e0.appspot.com",
  messagingSenderId: "842276729409",
  appId: "1:842276729409:web:efaa8e2d6e23568adf4cc0"
};

// init firebase app
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

// Init db service
const db = getFirestore();

// collection ref
const colRef = collection(db, 'users');

// // get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let users = [];
//     snapshot.docs.forEach((doc) => {
//       users.push({...doc.data(), id: doc.id})
//     })
//     console.log(users)
//   })
//   .catch(err => {
//     console.log(err.message);
//   })



const auth = getAuth();

export {auth, firebase, colRef, db};
