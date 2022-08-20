importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBWV44XKYxmaUjgC6esgIpDIQnXO8DBubM",
  authDomain: "web-push-59c5b.firebaseapp.com",
  databaseURL:
    "https://web-push-59c5b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-push-59c5b",
  storageBucket: "web-push-59c5b.appspot.com",
  messagingSenderId: "594747426861",
  appId: "1:594747426861:web:1fe09572b4c6efe34a10a4",
  measurementId: "G-QH2H3MLW7L",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
