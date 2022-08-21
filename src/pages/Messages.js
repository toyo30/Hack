import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import MessageGroup from '../components/MessageGroup';

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
                        {userObj.displayName} 님의 메시지
                    </div>
                    <div>오늘 밤에 받을 메세지에요. {message} </div>
                    <Link to="/updatemessage">수면 메세지 작성하기</Link>
                    <div>
                        <div>내가 지금까지 쓴 메세지</div>
                        <div>야 짤리고 싶냐??</div>
                        <div>일어날래?</div>
                    </div>
                    <MessageGroup>
                        <MessageBox/><MessageBox/>
                        <MessageBox/><MessageBox/>
                    </MessageGroup>
                    <MessageGroup>
                         <MessageBox type="day"/><MessageBox type="day"/>
                         <MessageBox type="day"/><MessageBox type="day"/>
                    </MessageGroup>
                      
                     
                    
                  
                   
                    
                </>
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
