import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import styled, {css} from 'styled-components';
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Button from "../components/Button";
import Logo from "../components/Logo";

const BasicInfo = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "message") {
            setMessage(value);
        } else if (name === "sleepTime") {
            setSleepTime(value);
        } else if (name === "wakeTime") {
            setWakeTime(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj) {
            try {
                const res = await dbService.collection("수면정보").add({
                    name: userObj.displayName,
                    user: userObj.uid,
                    sleepTime,
                    wakeTime,
                    message,
                });
                navigate("/home");
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError("아직 로그인 상태가 아닌걸요??");
        }
    };
    return (
        <Page>
            <Box>
                {isLoggedIn ? (
                    <Text style={{fontSize: "30px", lineHeight: "50px", fontWeight: "700"}}>
                        기본 정보를 입력해주세요
                    </Text>
                ) : (
                  <Text style={{fontSize: "30px", lineHeight: "50px", fontWeight: "700"}}>로그인이 안되어있는데요? </Text>
                )}
                <form onSubmit={onSubmit}>
                    <FormSection>
                        <InputField
                            name="sleepTime"
                            type="text"
                            placeholder="오늘 ? 시에 잘 거에요."
                            required
                            value={sleepTime}
                            onChange={onChange}
                        />
                        <InputField
                            name="wakeTime"
                            type="text"
                            placeholder="내일 ? 시에 일어날래요."
                            required
                            value={wakeTime}
                            onChange={onChange}
                        />
                        <InputField
                            name="message"
                            type="text"
                            placeholder="오늘 밤에 받을 메세지에요."
                            required
                            value={message}
                            onChange={onChange}
                        />

                        <InputField type="submit" value="시작하기"/>
                    </FormSection>
                </form>
                {error === "" ? null : (
                    <div
                        style={{
                            marginLeft: "29%",
                            marginRight: "32%",
                            color: "red",
                            marginTop: "0.5%",
                        }}
                    >
                        {error}
                    </div>
                )}
                {/* <Link to="/signup">회원가입 화면으로 이동하기</Link>
                <Link to="/login">로그인 화면으로 이동하기</Link>
                <Link to="/home">홈화면으로 이동하기</Link> */}
            </Box>
        </Page>
    );
};

export default BasicInfo;

const Box = styled.body`
    background: linear-gradient(#232226, #3C4659, #898AA5);  
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
`;


const InputField=styled.input`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent !important;

    border: 0;
    outline: 0;
    margin: 9px;
    border-radius: 0;
    padding: 0px 15px ;

    user-select: none;
    vertical-align: middle;
    moz-appearance: none; 
    /*Reset*/
    -webkit-appearance: none; // Reset
    text-decoration: none,
    color: inherit;
    '&::-moz-focus-inner': {
    border-style: none; // Remove Firefox dotted outline.
    };

    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: -0.5px;

    color: #F2F4F6;

    background: rgba(242, 244, 246, 0.2);
    border-radius: 14px;

    width: 261px;
    height: 47px;
`;