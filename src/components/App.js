import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Notification from '../Notification';
import {
  requestForToken,
} from "../fbase";
import { url, config } from "../SendMessage";

const axios = require("axios");


function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);


    /* web push */
    const [currentDeviceToken, setCurrentDeviceToken] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
        requestForToken().then((result) => setCurrentDeviceToken(result));
    }, [])

    const target_data = {
    to: `${currentDeviceToken}`,
    notification: {
      title: "버튼 클릭 ",
      body: `클릭횟수 ${count}`,
    },
  };
    

  const sendMessage = () => {
    axios
      .post(url, target_data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      setCount(count + 1);
  };

  useEffect(() => {
    setTimeout(() => {
      sendMessage();    
    }, 5000);
    
   
    
  }, [currentDeviceToken]);


    return (
        <>
            <GlobalStyle />
            {init ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                    setUserObj={setUserObj}
                />
            ) : (
                <AppRouter isLoggedIn={false} userObj={null} />
            )}
            <button onClick={sendMessage}>버튼</button>
            <Notification/>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
  ${reset};
`

export default App;
