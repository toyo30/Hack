import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./fbase";
import Link from "./components/Link";

const Notification = ({
    sleepStartTimeHour,
    sleepStartTimeMinute,
    serverTimeHour,
    serverTimeMinute,
    serverTimeSecond,
}) => {
    const [notification, setNotification] = useState({ title: "", body: "" });

    const notify = () =>
        toast(<ToastDisplay />, {
            duration: 4000,
        });

    function ToastDisplay() {
        return (
            <Link to="/messages">
                <div>
                    <p>
                        <b>{notification?.title}</b>
                    </p>
                    <p>{notification?.body}</p>
                </div>
            </Link>
        );
    }

    useEffect(() => {
        if (
            sleepStartTimeHour == serverTimeHour &&
            sleepStartTimeMinute == serverTimeMinute &&
            serverTimeSecond == 0
        ) {
            notify();
            navigator.serviceWorker.ready.then(function (registration) {
                registration.showNotification(`${notification?.title}`, {
                    body: `${notification?.body}`,

                    icon: "../images/touch/chrome-touch-icon-192x192.png",

                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                });
            });
        }
    }, [notification]);

    onMessageListener()
        .then((payload) => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body,
            });
        })
        .catch((err) => console.log("failed: ", err));

    // requestForToken();

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
