import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCn24n7VxTzNPx9YPHuqk__JlCCNVaP1DU",
    authDomain: "chat-30c2b.firebaseapp.com",
    projectId: "chat-30c2b",
    storageBucket: "chat-30c2b.appspot.com",
    messagingSenderId: "869238948578",
    appId: "1:869238948578:web:7cc9fff1bf585efbd054bb",
    measurementId: "G-98TF7NT85B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase
