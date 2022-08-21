import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import MessageGroup from '../components/MessageGroup';
import styled from "styled-components";
import Button from '../components/Button';
import Link from '../components/Link';

const Messages = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

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

    const upBox = (e) => {
        console.log(down);
       
       
            setUp(true);

    };

    const downBox = (e) => {
         if(down){
            setUp(false);
        }
       setDown(true);
    };

    return (
        <Page>
            {isLoggedIn && sleepInfoInit ? (
                <div style={{
                paddingBottom: '48px',
                boxSizing: 'border-box',
                height:'100%'}}
            >
                <MessageContainer className={`${up ? 'up-box':''} ${down ? 'down-box':''}`}>
                    <MessageGroup>
                        <MessageBox/><MessageBox/>
                        <MessageBox/><MessageBox/>
                    </MessageGroup>
                    <MessageButtonBox>
                        <Button onClick={upBox} style={{background: '#81839E', width:'50%', borderRadius:'border-radius: 3px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', }}>From 재우미 친구들</Button>
                        <Button onClick={downBox} style={{color: 'rgba(60, 70, 89, 0.87)', background: '#FBFBFB', width:'50%',  borderRadius:'border-radius: 3px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', }}>From 과거의 나</Button>
                        
                    </MessageButtonBox>
                    <MessageGroup type="day">
                        <Link to="/updatemessage"><MessageBox add type='day'>수면 메세지 작성하기</MessageBox></Link>
                         <MessageBox userName={`${userObj.displayName}`} content={`${message}`} type="day"/><MessageBox userName={`${userObj.displayName}`} type="day"/>
                         <MessageBox userName={`${userObj.displayName}`} type="day"/><MessageBox userName={`${userObj.displayName}`} type="day"/>
                    </MessageGroup>   
                </MessageContainer>
                </div>
            ) : (
                <div>
                    홈화면입니다. 지금 로그인되지 않았어요
                    <Link to="/signup"><Button>회원가입</Button></Link>
                    <Link to="/login"><Button>로그인</Button></Link>
                    <Link to="/home"><Button>홈화면</Button></Link>
                </div>
            )}
            {/* {sleepInfoInit ? (
                <div>
                    <div>내일 기상시간 : {wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                </div>
            ) : null} */}
            
            {/* <Link to="/mypage">마이페이지로 이동하기</Link> */}
            <NavBar index={0} />
        </Page>
    );
};

export default Messages;


const MessageButtonBox = styled.div`
    display: flex;
    background: #81839E;  
`;

const MessageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition-duration:0.5s; transition-delay:1s; transition-timing-function: ease-in;


    &.up-box {
       translate: transformY(100px);
    }

    &.down-box {
        transform: translateY(-330px);
        
    }
`;