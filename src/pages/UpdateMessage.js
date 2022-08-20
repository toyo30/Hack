import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import Button from "../components/Button";
import Chart from "../components/Chart";
import Page from "../components/Page";
import NavBar from "components/NavBar";

const UpdateMessage = ({ isLoggedIn, userObj }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [sleepInfo, setSleepInfo] = useState(null);
    const [sleepInfoInit, setSleepInfoInit] = useState(false);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "message") {
            setMessage(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`수면정보/${sleepInfo.id}`).update({
            message,
        });
        setMessage("");
        navigate("/messages");
    };

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
                console.log(mySleepInfo);
                setSleepInfo(mySleepInfo);
                setMessage(mySleepInfo.message);
            });
            setSleepInfoInit(true);
        }
    }, [userObj]);

    return (
        <Page>
            {isLoggedIn ? (
                <div>{userObj.displayName} 님 어젯밤 잘 주무셨나요??</div>
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
                    <form onSubmit={onSubmit}>
                        <textarea
                            value={message}
                            type="text"
                            name="message"
                            onChange={onChange}
                        />

                        <button type="submit">메세지 수정</button>
                    </form>
                </div>
            ) : null}
            <Button />
            <NavBar index={0} />
        </Page>
    );
};

export default UpdateMessage;
