import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Start from "../pages/Start";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import First from "../pages/First";
import BasicInfo from "../pages/BasicInfo";
import Mypage from "../pages/Mypage";
import Messages from "../pages/Messages";
import Alarm from "../pages/Alarm";
import Maxim from "../pages/Maxim";
import UpdateMessage from "../pages/UpdateMessage";

const AppRouter = ({ isLoggedIn, userObj, setUserObj }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Start
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/login"
                    element={
                        <Login
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/signup"
                    element={
                        <Signup
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/home"
                    element={
                        <Home
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/first"
                    element={
                        <First
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>

                <Route
                    path="/Mypage"
                    element={
                        <Mypage
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/basicinfo"
                    element={
                        <BasicInfo
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/messages"
                    element={
                        <Messages
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/updatemessage"
                    element={
                        <UpdateMessage
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/alarm"
                    element={
                        <Alarm
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
                <Route
                    path="/maxim"
                    element={
                        <Maxim
                            isLoggedIn={isLoggedIn}
                            userObj={userObj}
                            setUserObj={setUserObj}
                        />
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
