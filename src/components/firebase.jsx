import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8aWvII5skC2_Jfp4iNs_qL5viZP6KHV8",
  authDomain: "pinterest-37181.firebaseapp.com",
  projectId: "pinterest-37181",
  storageBucket: "pinterest-37181.appspot.com",
  messagingSenderId: "206998992613",
  appId: "1:206998992613:web:e45744a5dc59ac9dbbc60c",
  measurementId: "G-NYPW4QWWD0",
};

firebase.intitializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
