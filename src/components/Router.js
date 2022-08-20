import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Start from "../pages/Start";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import First from "../pages/First";

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
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
