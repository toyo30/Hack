import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import styled, { css } from "styled-components";
import Page from "../components/Page";
import NavBar from "components/NavBar";
import Text from "../components/Text";
import Button from "../components/Button";
import InputField from "components/InputField";


const UpdateMessage = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [sleepInfo, setSleepInfo] = useState(null);
    const [sleepInfoInit, setSleepInfoInit] = useState(false);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "message") {
            setMessage(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`수면정보/${sleepInfo.id}`).update({
            message,
        });
        setMessage("");
        navigate("/messages");
    };

    useEffect(() => {
        if (userObj) {
            dbService.collection("수면정보").onSnapshot((snapshot) => {
                const sleepInfoArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const mySleepInfo = sleepInfoArray.find(
                    (e) => e.user === userObj.uid
                );
                console.log(mySleepInfo);
                setSleepInfo(mySleepInfo);
                setMessage(mySleepInfo.message);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    return (
        <Page>
          <Box>
            {isLoggedIn ? (
                <Text style={{fontSize: "28px"}}>{userObj.displayName} 님, <br /> 어젯밤 잘 주무셨나요?</Text>
            ) : (
                <ContentBox>
                    지금 로그인되지 않았어요
                    <Link to="/signup"><Button>회원가입</Button></Link>
                    <Link to="/login"><Button>로그인</Button></Link>
                    <Link to="/home"><Button>홈화면</Button></Link>
                </ContentBox>
            )}
            {sleepInfoInit ? (
                <ContentBox>
                    <form onSubmit={onSubmit}>
                        <InputField
                          style={{height: "300px"}}
                            value={message}
                            type="text"
                            name="message"
                            onChange={onChange}
                            placeholder="오늘 밤의 나에게 한마디"
                        />
                        <Button type="submit" >저장</Button>
                    </form>
                </ContentBox>
            ) : null}
          </Box>
          <NavBar index={0} />
        </Page>
    );
};

export default UpdateMessage;

const Box = styled.div`
    background: linear-gradient(#232226, #3c4659, #898aa5);
    height: 592px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;


const ContentBox = styled.div`
    margin: 0;
    padding: 0;
    width:90%;
    height:100%;
    display:flex
    flex-direction: column;
    align-items: center;
`;
