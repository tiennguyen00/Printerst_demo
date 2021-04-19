// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC8aWvII5skC2_Jfp4iNs_qL5viZP6KHV8",
  authDomain: "pinterest-37181.firebaseapp.com",
  projectId: "pinterest-37181",
  storageBucket: "pinterest-37181.appspot.com",
  messagingSenderId: "206998992613",
  appId: "1:206998992613:web:4230f4e59f5f842ebbc60c",
  measurementId: "G-4L2C03EGLQ",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
