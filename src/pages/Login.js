import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import styled, {css} from 'styled-components';
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Logo from "../components/Logo";

const Login = ({ isLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        console.log(email, password);
        event.preventDefault();
        try {
            let data;
            data = await authService.signInWithEmailAndPassword(
                email,
                password
            );
            console.log(data);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Page>
            <Box>
                {isLoggedIn ? (
                    <span>로그인 되었어요!</span>
                ) : (
                    <Flex><Text style={{fontSize: "36px"}}>로그인</Text><Logo></Logo></Flex>
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
                        <InputField type="submit" value="Log In" />
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
                
                {/* <Link to="/login"><Button>로그인 화면으로 이동하기</Button></Link> */}
                
                <Flex>
                    <Text>계정이 없으신가요?</Text>
                    <Link to="/signup"><Text style={{color: "#232226", marginLeft: "8px", cursor: "pointer"}}>회원가입하러 가기</Text>
                    </Link>
                </Flex>

                {/* <Link to="/home"><Button>홈화면으로 이동하기</Button></Link>
                <Link to="/mypage"><Button>마이페이지로 이동하기</Button></Link> */}

            </Box>
        </Page>
    );
};

export default Login;


const Box = styled.body`
    background: linear-gradient(#232226, #3C4659, #898AA5);  
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