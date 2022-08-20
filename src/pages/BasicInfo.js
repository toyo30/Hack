import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate, Link } from "react-router-dom";
import Page from "../components/Page";

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
            <div>
                {isLoggedIn ? (
                    <span>
                        회원가입이 완료되었어요. 수면정보를 입력해주세요!
                    </span>
                ) : (
                    <span>로그인이 안되어있는데요? </span>
                )}
                <form onSubmit={onSubmit}>
                    <input
                        name="sleepTime"
                        type="text"
                        placeholder="오늘 ? 시에 잘 거에요."
                        required
                        value={sleepTime}
                        onChange={onChange}
                    />
                    <input
                        name="wakeTime"
                        type="text"
                        placeholder="내일 ? 시에 일어날래요."
                        required
                        value={wakeTime}
                        onChange={onChange}
                    />
                    <input
                        name="message"
                        type="text"
                        placeholder="오늘 밤에 받을 메세지에요."
                        required
                        value={message}
                        onChange={onChange}
                    />

                    <input type="submit" value="정보 입력" />
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

export default BasicInfo;
