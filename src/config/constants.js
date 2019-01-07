import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCZTOyyav96uWqPM2noIZOosRDQj5f7eo8",
  authDomain: "dandychef-mvs.firebaseapp.com",
  databaseURL: "https://dandychef-mvs.firebaseio.com",
  projectId: "dandychef-mvs",
  storageBucket: "dandychef-mvs.appspot.com",
  messagingSenderId: "750730964442"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({ timestampsInSnapshots: true });
