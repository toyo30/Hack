import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Link from "../components/Link";
import Page from "../components/Page";
import Text from "../components/Text";
import Button from "../components/Button";
import InputField from "../components/InputField";

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
                    message: [message],
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
            <Box>
                {isLoggedIn ? (
                    <Text
                        style={{
                            fontSize: "30px",
                            lineHeight: "50px",
                            fontWeight: "700",
                        }}
                    >
                        기본 정보를 입력해주세요
                    </Text>
                ) : (
                    <></>
                )}

                <form onSubmit={onSubmit}>
                    <FormSection>
                        <Button
                            style={{
                                width: "310px",
                                height: "60px",
                                margin: "10px",
                            }}
                        >
                            <Select
                                value={wakeTimeHour}
                                name="wakeTimeHour"
                                onChange={onChange}
                                required
                            >
                                <option value="">시 선택 ▾</option>
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
                            </Select>
                            <Text style={{ margin: "0 10px" }}>시</Text>
                            <Select
                                value={wakeTimeMinute}
                                name="wakeTimeMinute"
                                onChange={onChange}
                                required
                            >
                                <option value="">분 선택 ▾</option>
                                <option value="00">00</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </Select>
                            <Text style={{ margin: "0 10px" }}>
                                분에 일어날래요
                            </Text>
                        </Button>

                        <Button
                            style={{
                                width: "310px",
                                height: "60px",
                                margin: "10px",
                            }}
                        >
                            <Text style={{ margin: "0 10px" }}>적어도</Text>
                            <Select
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
                            </Select>
                            <Text style={{ margin: "0 10px" }}>
                                시간 잘 거예요.
                            </Text>
                        </Button>

                        <Button
                            style={{
                                width: "310px",
                                height: "200px",
                                margin: "10px",
                                cursor: "default",
                            }}
                        >
                            <Flex>
                                <Text
                                    style={{
                                        height: "20px",
                                        margin: "0 0 50px 5px",
                                    }}
                                >
                                    오늘 밤에 받을 메시지예요
                                </Text>
                                <InputField
                                    style={{
                                        width: "260px",
                                        height: "110px",
                                        margin: "0",
                                        cursor: "text",
                                        margin: "0 0 20px 0 ",
                                    }}
                                    name="message"
                                    type="text"
                                    placeholder="자기 전의 나에게 보내는 한마디"
                                    required
                                    value={message}
                                    onChange={onChange}
                                />
                            </Flex>
                        </Button>

                        <InputField
                            style={{ width: "310px" }}
                            type="submit"
                            value="시작하기"
                        />
                    </FormSection>
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
            </Box>
        </Page>
    );
};

export default BasicInfo;

const Box = styled.body`
    background: linear-gradient(#232226, #3c4659, #898aa5);
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;

const Select = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -moz-appearance: textfield;

    border-radius: 8px;
    width: 72px;
    height: 25px;
    background: rgba(242, 244, 246, 0.2);
    padding-left: 5px;
`;
