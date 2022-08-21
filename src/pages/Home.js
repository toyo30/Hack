import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";

import styled, { css } from "styled-components";
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Button from "../components/Button";
import NavBar from "components/NavBar";
import CircularGraph from "components/CircularGraph";

const Home = ({ isLoggedIn, userObj }) => {
    // const [editSleepTime, setEditSleepTime] = useState("");
    // const [editWakeTimeHour, setEditWakeTimeHour] = useState("");
    // const [editWakeTimeMinute, setEditWakeTimeMinute] = useState("");

    const [sleepTime, setSleepTime] = useState(""); // 자야하는 시간 ex) 8시간
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfo, setSleepInfo] = useState(null);
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const [sleepInfoInit2, setSleepInfoInit2] = useState(false);
    const [sleepStartTime, setSleepStartTime] = useState(""); // 자야하는 시각 ex) 22:30

    const navigate = useNavigate();

    //db에 있는 수면 정보 가져오는 부분 (sleepTime, wakeTime)
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
                setSleepInfoInit(true);

                // const wTime = mySleepInfo.wakeTime.split(":");
                // console.log(wTime[1]);
                // setEditWakeTimeHour(wTime[0]);
                // setEditWakeTimeMinute(wTime[1]);
            });
        }
    }, [userObj]);

    //sleepStartTime 계산하는 부분

    useEffect(() => {
        let hr = wakeTime.split(":")[0] - sleepTime;

        if (hr < 0) {
            hr = hr + 24;
        }

        if (hr < 10) {
            hr = "0" + hr;
        }
        setSleepStartTime(hr + ":" + wakeTime.split(":")[1]);
        setSleepInfoInit2(true);
    }, [wakeTime, sleepTime, sleepInfoInit]);

    //이제 필요 없는 부분의 시작

    // const onChange = (event) => {
    //     const {
    //         target: { name, value },
    //     } = event;
    //     if (name === "editWakeTimeHour") {
    //         setEditWakeTimeHour(value);
    //     } else if (name === "editWakeTimeMinute") {
    //         setEditWakeTimeMinute(value);
    //     } else if (name === "editSleepTime") {
    //         setEditSleepTime(value);
    //     }
    // };

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(sleepInfo);
    //     console.log(wakeTimeHour, wakeTimeMinute, sleepTime);
    //     await dbService.doc(`수면정보/${sleepInfo.id}`).update({
    //         wakeTime: editWakeTimeHour + ":" + editWakeTimeMinute,
    //         sleepTime: editSleepTime,
    //     });

    //     setEditSleepTime("");

    //     navigate("/home");
    // };

    //이제 필요 없는 부분의 끝

    //converter의 시작 부분

    const whenToWakeToWakeTime = (t) => {
        console.log(t);
        let result;
        if (t < 100) {
            t = t.toString();
            let hr = 0;
            let m = (t * 3) / 5;
            if (m == 0) {
                m = "00";
            }
            result = "0" + hr + ":" + m;
        } else if (t < 1000 && t >= 100) {
            t = t.toString();
            let hr = t.slice(0, 1);
            let m = (t.slice(1, 3) * 3) / 5;
            if (m == 0) {
                m = "00";
            }
            result = "0" + hr + ":" + m;
        } else if (t < 10000 && t >= 1000) {
            t = t.toString();
            let hr = t.slice(0, 2);
            let m = (t.slice(2, 4) * 3) / 5;
            if (m == 0) {
                m = "00";
            }
            result = hr + ":" + m;
        }
        return result;
    };

    const wakeTimeToWhenToWake = (t) => {
        const hr = t.split(":")[0];
        const m = t.split(":")[1];
        let result = hr * 100 + (m * 5) / 3;
        return result;
    };

    //converter 끝 부분

    const [whenToWake, setWhenToWake] = useState(600);
    const [sleepingTimeCent, setSleepingTimeCent] = useState(100);
    const [whenToSleep, setWhenToSleep] = useState(0);
    const [isClockInfoSet, setIsClockInfoSet] = useState(false);
    const [isClockInfoSet2, setIsClockInfoSet2] = useState(false);

    //유저의 수면정보를 가져온 후에 시계 정보를 설정한다

    useEffect(() => {
        if (sleepInfoInit && sleepInfoInit2) {
            setWhenToWake(wakeTimeToWhenToWake(wakeTime));
            // setWhenToSleep(wakeTimeToWhenToWake(sleepStartTime));
            setSleepingTimeCent(sleepTime * 100);
            setIsClockInfoSet(true);
        }
    }, [sleepInfoInit, sleepInfoInit2]);

    const [startDeg, setStartDeg] = useState(0);
    const [endDeg, setEndDeg] = useState(50);
    const [isClockChanging, setIsClockChanging] = useState(false);

    //사용자의 입력에 따라 wakeTime, sleepTime, sleepStartTime 바꿔주는 부분, update까지 해주기

    useEffect(() => {
        if (isClockChanging) {
            setSleepTime(sleepingTimeCent / 100); // 자야하는 시간 ex) 8시간
            setWakeTime(whenToWakeToWakeTime(whenToWake));
            updateSleepInfo();
        }
    }, [isClockChanging, whenToWake, whenToSleep, sleepingTimeCent]);

    const updateSleepInfo = async () => {
        if (isClockChanging) {
            await dbService.doc(`수면정보/${sleepInfo.id}`).update({
                wakeTime,
                sleepTime,
            });
            // console.log(res);
        }
    };

    //시계 작동 로직

    useEffect(() => {
        if (isClockInfoSet || isClockChanging) {
            setWhenToSleep(() => {
                const sub = whenToWake - sleepingTimeCent;
                if (sub < 0) return 2400 + sub;
                else return sub;
            });
            setIsClockInfoSet2(true);
        }
    }, [isClockInfoSet, whenToWake, sleepingTimeCent]);

    useEffect(() => {
        if (isClockInfoSet || isClockChanging) {
            setStartDeg(() => {
                if (whenToSleep > 1200) {
                    //왼쪽으로 가야 한다
                    return ((whenToSleep - 2400) / 100) * (360 / 24);
                } else {
                    return (whenToSleep / 100) * (360 / 24);
                }
            });
            setEndDeg((whenToWake / 100) * (360 / 24));
        }
    }, [whenToSleep, whenToWake, isClockInfoSet]);

    return (
        <Page>
            <Box>
                {isLoggedIn ? (
                    <>
                        <Text style={{ fontSize: "24px" }}>
                            {userObj.displayName} 님, 잘 잡시다.
                        </Text>
                        <Button
                            onClick={() => {
                                authService.signOut();
                                navigate("/");
                            }}
                        >
                            로그아웃
                        </Button>
                    </>
                ) : (
                    <div>
                        <Text>지금 로그인되지 않았어요</Text>
                        <Link to="/signup">
                            <Button>회원가입</Button>
                        </Link>
                        <Link to="/login">
                            <Button>로그인</Button>
                        </Link>
                    </div>
                )}

                {isClockInfoSet && isClockInfoSet2 ? (
                    <>
                        <div style={{ width: "90%", marginTop: "30px" }}>
                            <CircularGraph start={startDeg} end={endDeg} />
                        </div>

                        <BottomBox>
                            <div>
                                <span>취침 시각</span>
                                <span className="time">
                                    {Math.floor(
                                        whenToSleep / 100
                                    ).toLocaleString("en-US", {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false,
                                    })}
                                    :{whenToSleep % 100 === 50 ? 30 : "00"}
                                </span>
                            </div>
                            <div>
                                <div>
                                    <span>수면 시간</span>
                                    <div>
                                        <div
                                            onClick={() => {
                                                setSleepingTimeCent(
                                                    (prev) => (prev += 50)
                                                );
                                                setIsClockChanging(true);
                                            }}
                                        >
                                            +
                                        </div>
                                        <span className="time">
                                            {Math.floor(
                                                sleepingTimeCent / 100
                                            ).toLocaleString("en-US", {
                                                minimumIntegerDigits: 2,
                                                useGrouping: false,
                                            })}
                                            :
                                            {sleepingTimeCent % 100 === 50
                                                ? 30
                                                : "00"}
                                        </span>
                                        <div
                                            onClick={() => {
                                                setSleepingTimeCent(
                                                    (prev) => (prev -= 50)
                                                );
                                                setIsClockChanging(true);
                                            }}
                                        >
                                            -
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span>기상 시각</span>
                                    <div>
                                        <div
                                            onClick={() => {
                                                setWhenToWake(
                                                    (prev) => (prev += 50)
                                                );
                                                setIsClockChanging(true);
                                            }}
                                        >
                                            +
                                        </div>
                                        <span className="time">
                                            {Math.floor(
                                                whenToWake / 100
                                            ).toLocaleString("en-US", {
                                                minimumIntegerDigits: 2,
                                                useGrouping: false,
                                            })}
                                            :
                                            {whenToWake % 100 === 50
                                                ? 30
                                                : "00"}
                                        </span>
                                        <div
                                            onClick={() => {
                                                setWhenToWake(
                                                    (prev) => (prev -= 50)
                                                );
                                                setIsClockChanging(true);
                                            }}
                                        >
                                            -
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BottomBox>
                    </>
                ) : null}

                {/* <BottomSection>
                <Bt>
                    <Text style={{fontSize: "11px", lineHeight: "16px"}}>{}-분 안에 자면 <br/>{}-시간 수면 목표 달성</Text>
                    <Text style={{fontSize: "11px", lineHeight: "16px"}}>명언</Text>
                </Bt>

            {sleepInfoInit ? (
                <div>
                    <div>내일 기상시간 :{wakeTime}</div>
                    <div>수면시간 : {sleepTime}</div>
                    {sleepStartTime ? (
                        <div>오늘 {sleepStartTime}에 잠들어야해요!</div>
                    ) : null}
                    <div>내일 기상 시간 수정하기</div>
                    <form onSubmit={onSubmit}>
                        <select
                            value={editWakeTimeHour}
                            name="editWakeTimeHour"
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
                            value={editWakeTimeMinute}
                            name="editWakeTimeMinute"
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
            </BottomSection> */}
            </Box>
            <NavBar index={1} />
        </Page>
    );
};

export default Home;

const Box = styled.div`
    display: absolute;
    background: linear-gradient(#232226, #3c4659, #898aa5);
    height: 592px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const BottomBox = styled.div`
    display: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: rgb(100, 100, 100) solid 1px;
    background-color: #8a8ba633;

    font-family: "NEXON Lv1 Gothic OTF";
    color: white;
    .time {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        letter-spacing: -0.5px;
    }
    > div {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-of-type {
            gap: 50px;
        }
    }
    > div:last-of-type {
        > div {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            > div {
                display: flex;
                flex-direction: column;
                align-content: center;
                > div {
                    cursor: pointer;
                    text-align: center;
                }
            }
        }
    }
`;

const BottomSection = styled.div`
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const Bt = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;
