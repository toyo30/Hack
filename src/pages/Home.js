import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import NavBar from "components/NavBar";

const Home = ({ isLoggedIn, userObj }) => {
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dbService.collection("수면정보").onSnapshot((snapshot) => {
            const sleepInfoArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));

            const mySleepInfo = sleepInfoArray.find(
                (e) => e.user === userObj.uid
            );
            console.log(mySleepInfo);
            setSleepTime(mySleepInfo.wakeTime);
            setWakeTime(mySleepInfo.sleepTime);
        });
        setSleepInfoInit(true);
    }, []);

    return (
        <Page>
            {isLoggedIn ? (
                <div>
                    {userObj.displayName} 님 홈화면입니다. 지금 로그인된
                    상태에요
                </div>
            ) : (
                <div>
                    홈화면입니다. 지금 로그인되지 않았어요
                    <Link to="/signup">회원가입 화면으로 이동하기</Link>
                    <Link to="/login">로그인 화면으로 이동하기</Link>
                    <Link to="/home">홈화면으로 이동하기</Link>
                </div>
            )}
            {sleepInfoInit ? (
                <div>
                    <div>내일 기상시간 : {wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                </div>
            ) : null}
            <button
                onClick={() => {
                    authService.signOut();
                    navigate("/");
                }}
            >
                로그아웃
            </button>
            <NavBar index={1} />
        </Page>
    );
};

export default Home;
