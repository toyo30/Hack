import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import NavBar from "../components/NavBar";
import MessageBox from "../components/MessageBox";
import MessageGroup from '../components/MessageGroup';
import styled from "styled-components";
import Button from '../components/Button';
import Link from '../components/Link';
import LoginBox from "components/LoginBox";

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
      if ( down ) {
        setDown(false);
      } else {
        setUp(true);
      }
    };

    const downBox = (e) => {
        if(up){
          setUp(false);
        } else {
          setDown(true);
        }
    };

    return (
        <Page>
            {isLoggedIn && sleepInfoInit ? (
                <div style={{
                paddingBottom: '48px',
                boxSizing: 'border-box',
                height:'100%',
                background: 'linear-gradient(180deg, #232226 0%, #3C4659 13.02%, #8A8BA6 44.27%, #FBFBFB 90.1%)',
                overflow:'hidden',
            }}
            >
                <MessageContainer className={`${up ? 'up-box':''} ${down ? 'down-box':''}`}>
                    <MessageGroup>
                        <MessageBox userName="순이" content="스마트폰 그만, 나둬"/>
                        <MessageBox userName="철수" content="오늘 할일 내일하자"/>
                        <MessageBox userName="짱구" content="오늘은 정말 일찍 잘거야"/>
                        <MessageBox userName="순이" content="내일 정말 아침런닝?"/>
                        <MessageBox/>
                    </MessageGroup>
                    <MessageButtonBox>
                        <Button onClick={downBox} style={{background: '#81839E', width:'50%', borderRadius:'border-radius: 3px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', }}>From 재우미 친구들</Button>
                        <Button onClick={upBox} style={{color: 'rgba(60, 70, 89, 0.87)', background: '#FBFBFB', width:'50%',  borderRadius:'border-radius: 3px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', }}>From 과거의 나</Button>
                        
                    </MessageButtonBox>
                    <MessageGroup type="day">
                        <Link to="/updatemessage"><MessageBox add type='day'>수면 메세지 작성하기</MessageBox></Link>
                         <MessageBox userName={`${userObj.displayName}`} content={`${message}`} type="day"/><MessageBox userName={`${userObj.displayName}`} type="day"/>
                         <MessageBox userName={`${userObj.displayName}`} type="day"/><MessageBox userName={`${userObj.displayName}`} type="day"/>
                    </MessageGroup>   
                </MessageContainer>
                </div>
            ) : (
                <Box><LoginBox></LoginBox></Box>
            )}
            <NavBar index={0} style={{
                zIndex: 134,
                background: '#FFFFFF',
            }}
            />
        </Page>
    );
};

export default Messages;



const Box = styled.div`
    background: linear-gradient(#232226, #3c4659, #898aa5);
    height: 592px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const MessageButtonBox = styled.div`
    display: flex;
    background: #81839E;  
`;

const MessageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    height: 1200px;
    transform: translateY(-260px);

    &.up-box {
       transform: translateY(-545px);
    }

    &.down-box {    
        transform: translateY(0px);
    }
`;