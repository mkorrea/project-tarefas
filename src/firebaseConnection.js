import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
 
const firebaseConfig = {
   apiKey: "AIzaSyBs6m8pXOcUHiYYxIgH1yIki1p4rZXcTDo",
   authDomain: "react-f5610.firebaseapp.com",
   projectId: "react-f5610",
   storageBucket: "react-f5610.appspot.com",
   messagingSenderId: "417367622433",
   appId: "1:417367622433:web:394a61b2707b21b95bb460",
   measurementId: "G-WTWYZ7XLKV"
 };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };