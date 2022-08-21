import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import styled, { css } from "styled-components";
import Page from "../components/Page";
import NavBar from "components/NavBar";
import Text from "../components/Text";
import Button from "../components/Button";
import InputField from "components/InputField";
import Link from "components/Link";

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

    const onSubmitClick = async (event) => {
        console.log("여기는 되지");
        // console.log(sleepInfo.message);
        const messageArray = [message, ...sleepInfo.message];
        console.log(messageArray);
        await dbService.doc(`수면정보/${sleepInfo.id}`).update({
            message: messageArray,
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
                // setMessage(mySleepInfo.message[0]);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    return (
        <Page>
            <Box>
                {isLoggedIn ? (
                    <Text
                        style={{
                            fontSize: "28px",
                            lineHeight: "50px",
                            marginTop: "30px",
                        }}
                    >
                        {userObj.displayName} 님,
                        <br /> 어젯밤 잘 주무셨나요?
                        <Text style={{ fontSize: "13px", lineHeight: "50px" }}>
                            오늘 밤의 나에게 보낼 한마디를 작성해주세요
                        </Text>
                    </Text>
                ) : (
                    <div>
                        지금 로그인되지 않았어요
                        <Link to="/signup">
                            <Button>회원가입</Button>
                        </Link>
                        <Link to="/login">
                            <Button>로그인</Button>
                        </Link>
                        <Link to="/home">
                            <Button>홈화면</Button>
                        </Link>
                    </div>
                )}
                {sleepInfoInit ? (
                    <FormField>
                        <InputField
                            style={{ height: "300px" }}
                            value={message}
                            type="text"
                            name="message"
                            onChange={onChange}
                            placeholder="오늘 밤의 나에게 한마디"
                        />
                        <Flex>
                            <Button style={{ width: "45%" }}>
                                <Link to="/messages">
                                    <Text>뒤로 가기</Text>
                                </Link>
                            </Button>
                            <Button
                                type="submit"
                                style={{ width: "45%" }}
                                onClick={onSubmitClick}
                            >
                                저장
                            </Button>
                        </Flex>
                    </FormField>
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

const FormField = styled.form`
    margin: 0px;
    padding: 10px 0 50px 0;
    width: 90%;
    height: 70%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 95%;
    height: 50px;
`;
