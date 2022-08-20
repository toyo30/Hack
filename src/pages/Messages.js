import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";

const Messages = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);

    useEffect(() => {
        if (userObj) {
            dbService.collection("수면정보").onSnapshot((snapshot) => {
                const sleepInfoArray = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                }));

                const mySleepInfo = sleepInfoArray.find(
                    (e) => e.user === userObj.uid
                );
                console.log(mySleepInfo);
                setMessage(mySleepInfo.message);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    return (
        <Page>
            {isLoggedIn && sleepInfoInit ? (
                <>
                    <div>
                        {userObj.displayName} 님 메시지화면입니다. 지금 로그인된
                        상태에요
                    </div>
                    <div>오늘 밤에 받을 메세지에요. {message} </div>
                </>
            ) : (
                <div>
                    홈화면입니다. 지금 로그인되지 않았어요
                    <Link to="/signup">회원가입 화면으로 이동하기</Link>
                    <Link to="/login">로그인 화면으로 이동하기</Link>
                    <Link to="/home">홈화면으로 이동하기</Link>
                </div>
            )}
            {/* {sleepInfoInit ? (
                <div>
                    <div>내일 기상시간 : {wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                </div>
            ) : null} */}
            <button
                onClick={() => {
                    authService.signOut();
                    navigate("/");
                }}
            >
                로그아웃
            </button>
            {/* <Link to="/mypage">마이페이지로 이동하기</Link> */}
            <Link to="/home">홈화면으로 이동하기</Link>
        </Page>
    );
};

export default Messages;
