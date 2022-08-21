import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Logo from "../components/Logo";

const Signup = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    // const [sleepTime, setSleepTime] = useState("");
    // const [wakeTime, setWakeTime] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "name") {
            setName(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;
            data = await authService
                .createUserWithEmailAndPassword(email, password)
                .then(async (res) => {
                    await res.user.updateProfile({
                        displayName: name,
                    });
                    // await dbService.collection("수면정보").add({
                    //     name,
                    //     user: res.user.uid,
                    //     sleepTime,
                    //     wakeTime,
                    // });
                });
            navigate("/basicinfo");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <Page>
            <Box>
                {isLoggedIn ? (
                    <></>
                ) : (
                    <Flex>
                        <Text style={{ fontSize: "36px" }}>회원가입</Text>
                        <Logo></Logo>
                    </Flex>
                )}
                <form onSubmit={onSubmit}>
                    <FormSection>
                        <InputField
                            name="email"
                            type="text"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={onChange}
                        />
                        <InputField
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={onChange}
                        />
                        <InputField
                            name="name"
                            type="text"
                            placeholder="이름"
                            required
                            value={name}
                            onChange={onChange}
                        />
                        <InputField type="submit" value="회원가입" />
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

                <Link to="/login">
                    <Text>로그인하러 가기</Text>
                </Link>

                {/* <Link to="/signup">회원가입 화면으로 이동하기</Link>
                <Link to="/home">홈화면으로 이동하기</Link> */}
            </Box>
        </Page>
    );
};

export default Signup;

const Box = styled.body`
    background: linear-gradient(#232226, #3c4659, #898aa5);
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Flex = styled.div`
    display: flex;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputField = styled.input`
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
