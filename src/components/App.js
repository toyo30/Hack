import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

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
        </>
    );
}

const GlobalStyle = createGlobalStyle`
  ${reset};
`

export default App;
