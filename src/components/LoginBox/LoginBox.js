import styled from "styled-components";
import Link from "../Link";
import Text from "../Text";
import Button from "../Button";



function LoginBox(){
  return (
    <LoginBoxRoot>
        <Text>지금 로그인되지 않았어요</Text>
        <Link to="/signup">
            <Button>회원가입</Button>
        </Link>
        <Link to="/login">
            <Button>로그인</Button>
        </Link>
    </LoginBoxRoot>
);
}

const LoginBoxRoot=styled.div`
    height: 35%;
    padding-top: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`


export default LoginBox;