import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import NavBar from "components/NavBar";

const Home = ({ isLoggedIn, userObj }) => {
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const navigate = useNavigate();
    const [wakeTimeHour, setWakeTimeHour] = useState("");
    const [wakeTimeMinute, setWakeTimeMinute] = useState("");

    useEffect(() => {
        if (userObj) {
            dbService.collection("수면정보").onSnapshot((snapshot) => {
                const sleepInfoArray = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                }));

                const mySleepInfo = sleepInfoArray.find(
                    (e) => e.user === userObj.uid
                );
                console.log(mySleepInfo);
                setSleepTime(mySleepInfo.wakeTime);
                setWakeTime(mySleepInfo.sleepTime);
                const wTime = mySleepInfo.wakeTime.split(":");
                console.log(wTime[1]);
                setWakeTimeHour(wTime[0]);
                setWakeTimeMinute(wTime[1]);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "wakeTimeHour") {
            setWakeTimeHour(value);
        } else if (name === "wakeTimeMinute") {
            setWakeTimeMinute(value);
        }
        // } else if (name === "marketType") {
        //     setMarketType(value);
        // }
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Page>
            {isLoggedIn ? (
                <div>
                    {userObj.displayName} 님 홈화면입니다. 지금 로그인된
                    상태에요
                </div>
            ) : (
                <div>
                    홈화면입니다. 지금 로그인되지 않았어요
                    <Link to="/signup">회원가입 화면으로 이동하기</Link>
                    <Link to="/login">로그인 화면으로 이동하기</Link>
                    <Link to="/home">홈화면으로 이동하기</Link>
                </div>
            )}
            {sleepInfoInit ? (
                <div>
                    <div>내일 기상시간 : {wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                    <div>여기에 시계 컴포넌트가 들어갑니다!</div>
                    <div>내일 기상 시간 수정하기</div>
                    <form onSubmit={onSubmit}>
                        <select
                            value={wakeTimeHour}
                            name="wakeTimeHour"
                            onChange={onChange}
                            required
                        >
                            <option value="">시간선택</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
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
                        <div>수면 시간 설정하기</div>
                        <select
                            // value={marketType}
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
                    </form>
                </div>
            ) : null}
            <button
                onClick={() => {
                    authService.signOut();
                    navigate("/");
                }}
            >
                로그아웃
            </button>
            <NavBar index={1} />
        </Page>
    );
};

export default Home;
