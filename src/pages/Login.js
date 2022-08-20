import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";

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
        try {
            let data;
            data = await authService.signInWithEmailAndPassword(
                email,
                password
            );
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
      <div>
        {isLoggedIn ? (
          <span>로그인 되었어요!</span>
        ) : (
          <span>로그인 해주세요!</span>
        )}
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input type="submit" value="Log In" />
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
        <Link to="/signup">회원가입 화면으로 이동하기</Link>
        <Link to="/login">로그인 화면으로 이동하기</Link>
        <Link to="/home">홈화면으로 이동하기</Link>
        <Link to="/mypage">마이페이지로 이동하기</Link>
      </div>
    );
};

export default Login;
