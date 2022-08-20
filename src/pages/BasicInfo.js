import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate, Link } from "react-router-dom";
import Page from "../components/Page";

const BasicInfo = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTimeHour, setWakeTimeHour] = useState("");
    const [wakeTimeMinute, setWakeTimeMinute] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "message") {
            setMessage(value);
        } else if (name === "sleepTime") {
            setSleepTime(value);
        } else if (name === "wakeTimeMinute") {
            setWakeTimeMinute(value);
        } else if (name === "wakeTimeHour") {
            setWakeTimeHour(value);
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
                    wakeTime: wakeTimeHour + ":" + wakeTimeMinute,
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
                    <div>
                        내일
                        <select
                            value={wakeTimeHour}
                            name="wakeTimeHour"
                            onChange={onChange}
                            required
                        >
                            <option value="">시간선택</option>
                            <option value="00">00</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        시
                        <select
                            value={wakeTimeMinute}
                            name="wakeTimeMinute"
                            onChange={onChange}
                            required
                        >
                            <option value="">분선택</option>
                            <option value="00">00</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                        분에 일어날 거에요
                    </div>
                    <div>
                        적어도
                        <select
                            value={sleepTime}
                            name="sleepTime"
                            onChange={onChange}
                            required
                        >
                            <option value="">수면 시간 선택</option>
                            <option value="1">1시간</option>
                            <option value="2">2시간</option>
                            <option value="3">3시간</option>
                            <option value="4">4시간</option>
                            <option value="5">5시간</option>
                            <option value="6">6시간</option>
                            <option value="7">7시간</option>
                            <option value="8">8시간</option>
                            <option value="9">9시간</option>
                            <option value="10">10시간</option>
                            <option value="11">11시간</option>
                            <option value="12">12시간</option>
                        </select>
                        은 자고 싶어요!
                    </div>

                    <div>
                        오늘 밤의 나에게 보낼 메시지를 입력해주세요!
                        <input
                            name="message"
                            type="text"
                            placeholder="오늘 밤에 받을 메세지에요."
                            required
                            value={message}
                            onChange={onChange}
                        />
                    </div>

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
