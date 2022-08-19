import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAz0NqNhanrGUh5sl2-5e8y1an9jOsiy8Y",
    authDomain: "jaeumi-e38ba.firebaseapp.com",
    projectId: "jaeumi-e38ba",
    storageBucket: "jaeumi-e38ba.appspot.com",
    messagingSenderId: "513936130163",
    appId: "1:513936130163:web:613985f75b3d1e393b6a06",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
