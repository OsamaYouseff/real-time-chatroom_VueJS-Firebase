import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBeRw3r0k3jLRXrSodI-IcyPjuUhkag32U",
    authDomain: "vue-project-website.firebaseapp.com",
    projectId: "vue-project-website",
    storageBucket: "vue-project-website.appspot.com",
    messagingSenderId: "992483732451",
    appId: "1:992483732451:web:3b3496d5921b5182e24ed6"
};


//// initialize firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();

//// initialize firestore
const projectFirestore = firebase.firestore();


const getTimestamp = firebase.firestore.FieldValue.serverTimestamp;


export { projectAuth, projectFirestore, getTimestamp }

