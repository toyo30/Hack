import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";

import styled, {css} from 'styled-components';
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Button from "../components/Button";
import Logo from "../components/Logo";
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
          <Box>
            {isLoggedIn ? (
                <Text style={{fontSize: "24px"}}>
                    {userObj.displayName} 님, 잘 잡시다.
                </Text>
            ) : (
                <div>
                    <Text>홈화면입니다. 지금 로그인되지 않았어요</Text>
                    <Link to="/signup"><Button>회원가입</Button></Link>
                    <Link to="/login"><Button>로그인</Button></Link>
                </div>
            )}
            
            <div>시계</div>
            
            <BottomSection>
                <Bt>
                    <Text style={{fontSize: "11px", lineHeight: "16px"}}>{}-분 안에 자면 <br/>{}-시간 수면 목표 달성</Text>
                    <Text style={{fontSize: "11px", lineHeight: "16px"}}>명언</Text>
                </Bt>

                {sleepInfoInit ? (
                <Bt>
                    <Text>기상 : {wakeTime}</Text>
                    <Text>수면 : {sleepTime}</Text>
                </Bt>
                ) : null}
            </BottomSection>

            {/* <button
                onClick={() => {
                    authService.signOut();
                    navigate("/first");
                }}
            >
                로그아웃
            </button> */}
          </Box>
          <NavBar index={1} />
        </Page>
    );
};

export default Home;

const Box = styled.div`
    display: absolute;
    background: linear-gradient(#232226, #3C4659, #898AA5);  
    height: 592px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const BottomSection = styled.div`
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const Bt= styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;