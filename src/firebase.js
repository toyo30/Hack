import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
// import { getAnalytics } from "firebase/analytics";

navigator.serviceWorker.register("firebase-messaging-sw.js");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_API_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};



const app = initializeApp(firebaseConfig);
// const message = app.messaging();
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

  })


export {
  app,
  messaging,
  requestForToken,
  onMessageListener,
  onBackgroundMessageListener,
};
