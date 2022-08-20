import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

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


navigator.serviceWorker.register("firebase-messaging-sw.js");
const messaging = getMessaging();

const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BGqiF-pXHqVsCqmRF0lSzJFY2t7n2rBDcdC5NqmpDdcRAROhcRy5Mcj2wIJ8d_b3W7ubvcJv-piRrE7uSJl7ZFM",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
        return currentToken;
        
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};


const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });


const onBackgroundMessageListener = () => 
  new Promise((resolve) => {
    onBackgroundMessage(messaging, (payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );
      resolve(payload)
      
      // Customize notification here
      // const notificationTitle = "Background Message Title";
      // const notificationOptions = {
      //   body: "Background Message body.",
      //   icon: "/firebase-logo.png",
      // };

    
    })
    ;

  });

  export {
  messaging,
  requestForToken,
  onMessageListener,
  onBackgroundMessageListener,
};
