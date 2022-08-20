import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  requestForToken,
  onMessageListener,
} from "./fbase";


const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = () => toast(<ToastDisplay />, {
    duration: 4000,
  });
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(`${notification?.title}`, {
        body: `${notification?.body}`,

        icon: "../images/touch/chrome-touch-icon-192x192.png",

        vibrate: [200, 100, 200, 100, 200, 100, 200],
      });
    });

  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      
    })
    .catch((err) => console.log("failed: ", err));



  return <Toaster />;
};

export default Notification;





// function showNotification() {
//   Notification.requestPermission(function (result) {
//     if (result === "granted") {
//       navigator.serviceWorker.ready.then(function (registration) {
//         registration.showNotification("Vibration Sample", {
//           body: "Buzz! Buzz!",
//           icon: "../images/touch/chrome-touch-icon-192x192.png",
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//           tag: "vibration-sample",
//         });
//       });
//     }
//   });
// }