const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyB3KcgB9-6ztO8RH6mfwUZSZ1wwn2pPYQc",
  authDomain: "monkeyfruad.firebaseapp.com",
  projectId: "monkeyfruad",
  storageBucket: "monkeyfruad.appspot.com",
  messagingSenderId: "726555330449",
  appId: "1:726555330449:web:ac01442745fea036233c30",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

module.exports = {
  auth,
  firestore,
  googleProvider,
};
