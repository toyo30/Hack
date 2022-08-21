import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";
import Button from "../components/Button";
import Chart from "../components/Chart";
import Page from "../components/Page";
import NavBar from "components/NavBar";
import Text from "components/Text";
import Typography from "../components/Typography";
import styled, {css} from "styled-components";
import LoginBox from "components/LoginBox";

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
          {isLoggedIn && sleepInfoInit  ? (
          <Box>
            <RecordBox>
              {visible ? (
                <WeekRecord>
                  <Text style={{ 
                    fontSize: "28px", 
                    fontWeight: "400",
                    ontWeight: "500", 
                    padding: "30px 20px 0 20px",
                    lineHeight: "50px"}}
                    >
                      {7}시간 수면,
                      <br />이번주에는 {3}번 달성했어요
                  </Text>
                  <div style={{ height: "363px", marginTop: "70px" }}>
                    <Chart style={{ height: "100%" }} />
                  </div>
                </WeekRecord>
              ) : (
                <AllRecord>
                  <Text style={{ 
                    fontSize: "28px", 
                    fontWeight: "400",
                    ontWeight: "500", 
                    padding: "30px 20px 0 20px",
                    lineHeight: "50px"}}
                  >
                      나의 수면 History
                  </Text>
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
                        height: "20px",
                        background: `${visible ? '#FFFFFF':'#E1E1E1'}`,
                        color: `${visible ? '#50586E':'gray'}`,
                        padding: "10px",
                        boxSizing: "content-box",
                        // borderRight: '10px solid #50586E'
                        borderRadius:"0",
                      }}
                    >
                      이번주 Sleep History
                    </Button>
                    <Button
                    className={`${visible === true? 'second-open': 'second-close'}`}
                    onClick={visibleHideHandler}
                    style={{
                      width: "166px",
                      height: "20px",
                      background: `${visible ? '#E1E1E1':'#FFFFFF'}`,
                      color: `${visible ? 'gray':'#50586E'}`,
                      padding: "10px",
                      boxSizing: "content-box",
                      borderRadius:"0",
                    }}
                    
                  >
                    내 Sleep History 더보기
                  </Button>
                  </ButtonBox>
            </RecordBox>
            </Box>
          ) : (
            <Box><LoginBox></LoginBox></Box>
          )}
          <NavBar index={2} />
      </Page>
    );
};

export default Mypage;

const Box = styled.div`

    background: linear-gradient(
        180deg,
        #3c4659 3%,
        #8a8ba6 17.33%,
        #ffffff 40%
    );
    height: 592px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

// const PageBackground = styled.div`
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//     180deg,
//     #3c4659 0%,
//     #8a8ba6 13.33%,
//     #ffffff 34.16%
//   );
//   background-color: red;
//   padding-top: 16px;
//   box-sizing: border-box;
//   padding-bottom: 75px;
// `;


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

const ButtonBox = styled.div`
  position: absolute;
  bottom: 48px;
`;

  // &.first div:first-child {
  //   background: #FFFFFF;
  //   color:red;
  // }

  // &.second div:first-child {
  //   background: #FFFFFF;
  // }

  // & .first-open {
  //   background: red;
  // }
