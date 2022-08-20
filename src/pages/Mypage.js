import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import Button from "../components/Button";
import Chart from "../components/Chart";
import Page from "../components/Page";
import NavBar from "components/NavBar";

const Mypage = ({ isLoggedIn, userObj }) => {
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);

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
          <></>
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
            <p>7시간 수면,</p>
            <p>이번주에는 3번 달성했어요</p>
            <Chart />
            <div
              style={{
                width: "100%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  width: "166px",
                  height: "33px",
                  background: "rgba(60, 70, 89, 0.23)",
                  borderRadius: "8px",
                  color: "rgba(60, 70, 89, 0.87)",
                  padding: '5px',
                  boxSizing: 'content-box',
                }}
              >
                내 Sleep History 더보기
              </Button>
            </div>
          </div>
        ) : null}
        <NavBar index={2} />
      </Page>
    );
};

export default Mypage;
