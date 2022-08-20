import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import Button from "../components/Button";
import Chart from "../components/Chart";
import Page from "../components/Page";
import NavBar from "components/NavBar";
import Typography from "../components/Typography";
import styled, {css} from "styled-components";

const Mypage = ({ isLoggedIn, userObj }) => {
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");
    const [sleepInfoInit, setSleepInfoInit] = useState(false);
    const [visible, setVisible] = useState(true);

    const visibleHideHandler = () => {
        setVisible(false);
    }

    const visibleOpenHandler = () => {
      setVisible(true);
    };


    useEffect(() => {
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
        });
        setSleepInfoInit(true);
    }, []);

    return (
      <Page>
        <PageBackground>
          {isLoggedIn ? (
            <></>
          ) : (
            <div>
              홈화면입니다. 지금 로그인되지 않았어요
              <Link to="/signup">회원가입 화면으로 이동하기</Link>
              <Link to="/login">로그인 화면으로 이동하기</Link>
              <Link to="/home">홈화면으로 이동하기</Link>
            </div>
          )}
          {sleepInfoInit ? (
            <RecordBox>
              {visible ? (
                <WeekRecord>
                  <Typography>{7}시간 수면,</Typography>
                  <Typography style={{ fontSize: "28px" }}>
                    이번주에는 {3}번 달성했어요
                  </Typography>
                  <div style={{ height: "363px", marginTop: "36px" }}>
                    <Chart style={{ height: "100%" }} />
                  </div>
                </WeekRecord>
              ) : (
                <AllRecord>
                  <Typography>나의 수면 History</Typography>
                  <div style={{ marginTop: "36px" }}>
                    <p style={{ color: "#3C4659", fontSize: "11px" }}>
                      2022.08.8~14
                    </p>
                    <Chart style={{ height: "100%" }} />
                  </div>
                  <div style={{ marginTop: "22px" }}>
                    <p style={{ color: "#3C4659", fontSize: "11px" }}>
                      2022.08.8~14
                    </p>
                    <Chart style={{ height: "100%" }} />
                  </div>
                  <div style={{ marginTop: "22px" }}>
                    <p style={{ color: "#3C4659", fontSize: "11px" }}>
                      2022.08.8~14
                    </p>
                    <Chart style={{ height: "100%" }} />
                  </div>
                </AllRecord>
              )}
               <ButtonBox
                 className={`${visible === true? 'first': 'second'}`}
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                    className={`${visible === true? 'first-open': 'first-close'}`}
                       onClick={visibleOpenHandler}
                      style={{
                        width: "166px",
                        height: "33px",
                        background: "#50586E",
                        background: `${visible ? '#50586E':'rgba(60, 70, 89, 0.23)'}`,
                        borderRadius: "8px",
                        color: `${visible ? '#FFFFFF':'rgba(60, 70, 89, 0.87)'}`,
                        padding: "5px",
                        boxSizing: "content-box",
                      }}
                    >
                      내 Sleep History 더보기
                    </Button>
                    <Button
                    className={`${visible === true? 'second-open': 'second-close'}`}
                    onClick={visibleHideHandler}
                    style={{
                      width: "166px",
                      height: "33px",
                      background: `${visible ? 'rgba(60, 70, 89, 0.23)':'#50586E'}`,
                      borderRadius: "8px",
                      color: `${visible ? 'rgba(60, 70, 89, 0.87)':'#FFFFFF'}`,
                      padding: "5px",
                      boxSizing: "content-box",
                    }}
                    
                  >
                    이번주 수면 데이터 보기
                  </Button>
                  </ButtonBox>
                  <ButtonBorder className={`${visible === true? 'color-blue': 'color-gray'}`}/>
            </RecordBox>
          ) : null}
          <NavBar index={2} />
        </PageBackground>
      </Page>
    );
};

export default Mypage;


const PageBackground = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
    180deg,
    #3c4659 0%,
    #8a8ba6 13.33%,
    #ffffff 34.16%
  );
  background-color: red;
  padding-top: 16px;
  box-sizing: border-box;
  padding-bottom: 75px;
`;


const WeekRecord = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const AllRecord = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: scroll;
`;

const RecordBox = styled.div`
  width: 100%;
  padding-bottom: 68px;
  height: 100%;
  box-sizing: border-box;
`;

const ButtonBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 20px;
  bottom: 48px;
  padding-bottom: 24px;
    background: #50586E;



`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 68px;
  padding-bottom: 24px;

  &.first div:first-child {
    background: #50586E;
    color:red;
  }

  &.second div:first-child {
    background: #50586E;
  }

  & .first-open {
    background: red;
  }

`;