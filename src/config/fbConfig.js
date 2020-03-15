import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAsODWWp4kAHcPFkCwOi6OPKJ5JZhTPJEs",
    authDomain: "fir-app-b6bb2.firebaseapp.com",
    databaseURL: "https://fir-app-b6bb2.firebaseio.com",
    projectId: "fir-app-b6bb2",
    storageBucket: "fir-app-b6bb2.appspot.com",
    messagingSenderId: "1062547364969"
  };
  firebase.initializeApp(config);
  //firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;