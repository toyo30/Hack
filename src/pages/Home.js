import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Page from "../components/Page";
import NavBar from "components/NavBar";

const Home = ({ isLoggedIn, userObj }) => {
    const [sleepTime, setSleepTime] = useState("");
    const [editSleepTime, setEditSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfo, setSleepInfo] = useState(null);
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const navigate = useNavigate();
    const [wakeTimeHour, setWakeTimeHour] = useState("");
    const [wakeTimeMinute, setWakeTimeMinute] = useState("");
    const [sleepStartTime, setSleepStartTime] = useState("");

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
                setSleepInfo(mySleepInfo);
                setSleepTime(mySleepInfo.sleepTime);
                setWakeTime(mySleepInfo.wakeTime);
                const wTime = mySleepInfo.wakeTime.split(":");
                console.log(wTime[1]);
                setWakeTimeHour(wTime[0]);
                setWakeTimeMinute(wTime[1]);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    useEffect(() => {
        let hr = wakeTimeHour - sleepTime;
        if (hr < 0) {
            hr = hr + 24;
        }
        console.log("취침시각", hr);
        console.log(typeof hr);

        if (hr < 10) {
            hr = "0" + hr;
        }
        console.log(hr);
        setSleepStartTime(hr + ":" + wakeTimeMinute);
    }, [wakeTimeHour, wakeTimeMinute, sleepTime]);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "wakeTimeHour") {
            setWakeTimeHour(value);
        } else if (name === "wakeTimeMinute") {
            setWakeTimeMinute(value);
        } else if (name === "editSleepTime") {
            setEditSleepTime(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(sleepInfo);
        console.log(wakeTimeHour, wakeTimeMinute, sleepTime);
        await dbService.doc(`수면정보/${sleepInfo.id}`).update({
            wakeTime: wakeTimeHour + ":" + wakeTimeMinute,
            sleepTime: editSleepTime,
        });

        // setWakeTimeHour("");
        // setWakeTimeMinute("");
        setEditSleepTime("");

        navigate("/home");
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
                    <div>내일 기상시간 :{wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                    {sleepStartTime ? (
                        <div>오늘 {sleepStartTime}에 잠들어야해요!</div>
                    ) : null}
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
                            value={editSleepTime}
                            name="editSleepTime"
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
                        <button type="submit">취침 시간 계산하기</button>
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
