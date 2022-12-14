import useCustomTime from "../zustand/useCustomTime";
import Page from "../components/Page";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService, storageService } from "fbase";
import Notification from "../Notification";
import { requestForToken } from "../fbase";
import { url, config } from "../SendMessage";

const axios = require("axios");

const Maxim = ({ isLoggedIn, userObj }) => {
    const maximList = [
        "잠을 자고 나면 미덕이 생기를 찾아 일어날 것이다. - 프레드리히 니체",
        "우리는 꿈들이 만들어지는 것과 같은 존재이며, 우리의 짧은 삶은 잠에 둘러싸여 있다. -윌리엄 셰익스피어",
        "잠은 최고의 명상. -달라이 라마",
        "숙면과 목욕, 한 잔의 와인은 슬픔을 누그러뜨린다. -토마스 아퀴나스",
        "신은 현재 여러 근심의 보상으로 희망과 잠을 주었다. -볼테르",
        "산다는 것은 앓는 것. 잠은 16시간마다 그 고통을 누그러뜨린다. -샹플뢰리",
        "잠은 눈꺼풀을 덮어 선한 것, 악한 것, 모든 것을 잊게 하는 것. -호메로스",
        "최고로 멋진 일은 자는 것이다. 최소한 꿈을 꿀 수 있기에. -마릴린 먼로",
        "꿈 연구는 황홀한 영역이다. 생계를 위해서 자기만 하면 된다. -스티븐 라버지",
        "우리는 잘 때 위선에서 벗어날 수 있다. -윌리엄 해즐린",
        "핀란드에서 7월 27일은 ‘잠꾸러기의 날’입니다",
    ];

    const [sleepTime, setSleepTime] = useState("");
    const [editSleepTime, setEditSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfo, setSleepInfo] = useState(null);
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const [editWakeTimeHour, setEditWakeTimeHour] = useState("");
    const [editWakeTimeMinute, setEditWakeTimeMinute] = useState("");
    const [sleepStartTime, setSleepStartTime] = useState("");
    const [sleepStartTimeInit, setSleepStartTimeInit] = useState(false);
    const [message, setMessage] = useState("");
    const [hasMyMessageSent, setHasMyMessageSent] = useState(false);
    const [hasMaximSent, setHasMaximSent] = useState(false);
    const customTime = useCustomTime();
    // console.log(customTime);

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
                setMessage(mySleepInfo.message[0]);
                const wTime = mySleepInfo.wakeTime.split(":");
                console.log(wTime[1]);
                setEditWakeTimeHour(wTime[0]);
                setEditWakeTimeMinute(wTime[1]);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    useEffect(() => {
        let hr = wakeTime.split(":")[0] - sleepTime;
        if (hr < 0) {
            hr = hr + 24;
        }
        console.log("취침시각", hr);
        console.log(typeof hr);

        if (hr < 10) {
            hr = "0" + hr;
        }
        console.log(hr);
        setSleepStartTime(hr + ":" + wakeTime.split(":")[1]);
        setSleepStartTimeInit(true);
    }, [wakeTime, sleepTime]);

    //메세지 보내는 부분
    const validateHour = (hour) => {
        return hour === 24 ? 0 : hour;
    };

    useEffect(() => {
        // console.log(sleepStartTime.split(":")[0]);
        // console.log(sleepStartTime.split(":")[1]);
        // console.
        if (
            sleepStartTime.split(":")[0] == customTime.hour &&
            sleepStartTime.split(":")[1] == customTime.minute
        ) {
            if (hasMyMessageSent === false) {
                sendMessage();
                setHasMyMessageSent(true);
            }
        }
        if (
            sleepStartTime.split(":")[0] == validateHour(customTime.hour + 1) &&
            sleepStartTime.split(":")[1] == customTime.minute
        ) {
            if (hasMaximSent === false) {
                sendMaxim();
                setHasMaximSent(true);
            }
        }
    }, [customTime.second]);

    // push 부분 시작

    const [currentDeviceToken, setCurrentDeviceToken] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
        requestForToken().then((result) => setCurrentDeviceToken(result));
    }, []);

    const target_data_message = {
        to: `${currentDeviceToken}`,
        notification: {
            title: "내가 오늘 아침에 쓴 메시지",
            body: `${message}`,
            click_action: "localhost:3000/messages",
        },
    };

    const target_data_maxim = {
        to: `${currentDeviceToken}`,
        notification: {
            title: "1시간 전!",
            body: `${maximList[0]}`,
            click_action: "localhost:3000/messages",
        },
    };

    // body: `${maximList[Math.floor(Math.random() * 12)]}`,

    const sendMessage = () => {
        axios
            .post(url, target_data_message, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendMaxim = () => {
        axios
            .post(url, target_data_maxim, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         sendMessage();
    //     }, 5000);
    // }, [currentDeviceToken]);

    //push 부분 끝

    return (
        <>
                <Notification
                    sleepStartTimeHour={sleepStartTime.split(":")[0]}
                    sleepStartTimeMinute={sleepStartTime.split(":")[1]}
                    serverTimeHour={customTime.hour}
                    serverTimeMinute={customTime.minute}
                    serverTimeSecond={customTime.second}
                />
        </>
    );
};

export default Maxim;
