import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDVcsMG4s_uVaTQtCDxZ6TOX8mGA6qRUTE",
  authDomain: "snow-9dc1f.firebaseapp.com",
  databaseURL: "https://snow-9dc1f.firebaseio.com",
  projectId: "snow-9dc1f",
  storageBucket: "",
  messagingSenderId: "959555125828"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;