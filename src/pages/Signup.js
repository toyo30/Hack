import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate, Link } from "react-router-dom";
import Page from "../components/Page";

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
            <div>
                {isLoggedIn ? (
                    <span>이미 가입된 회원이에요</span>
                ) : (
                    <span>회원가입페이지입니다!</span>
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
                    <input
                        name="name"
                        type="text"
                        placeholder="이름"
                        required
                        value={name}
                        onChange={onChange}
                    />
                    {/* <input
                        name="wakeTime"
                        type="text"
                        placeholder="내일 기상시간"
                        required
                        value={wakeTime}
                        onChange={onChange}
                    />
                    <input
                        name="sleepTime"
                        type="text"
                        placeholder="오늘 잘 시간"
                        required
                        value={sleepTime}
                        onChange={onChange}
                    /> */}

                    <input type="submit" value="회원가입" />
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
            </div>
        </Page>
    );
};

export default Signup;
