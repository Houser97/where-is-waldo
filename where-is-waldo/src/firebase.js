// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDueasQBc04KnrvtlkWhOf1SIqphpD0Jfo",
  authDomain: "where-is-waldo-cee83.firebaseapp.com",
  projectId: "where-is-waldo-cee83",
  storageBucket: "where-is-waldo-cee83.appspot.com",
  messagingSenderId: "501165901982",
  appId: "1:501165901982:web:6d3b339286fbd4c0cf938f"
};

// Recuperar coordenadas //
export const getCoordsBackEnd = async (characterName) => {
    let doc = '';
    if(characterName === 'BMO'){
        doc = "solutionBMO";
    } else if(characterName === "Marceline"){
        doc = "solution-marceline";
    } else{
        doc = "solution-tree-trunk";
    } 
    return await getDocs(collection(db,doc)).catch(doc => console.log("error"));
} 


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();