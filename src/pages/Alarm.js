import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled, {css} from 'styled-components';
import Page from "../components/Page";


function Alarm() {
    return (
    <Page>
        <Box>
          <Title>기상시간</Title>
          <div>시계</div>
          <AlarmText>멘트</AlarmText>
          <Link to ="/messages" style={{ textDecoration: 'none' }}>
              <SmallButton>중단</SmallButton>
          </Link>
        </Box>
    </Page>);
};


const Box = styled.body`
    background: linear-gradient(#232226, #3C4659);  
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Title = styled.div`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 72px;
    letter-spacing: -0.5px;

    color: rgba(255, 255, 255, 0.87);
`;

const SmallButton = styled.div`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 72px;
    letter-spacing: -0.5px;

    color: #F2F4F6;

    background: rgba(242, 244, 246, 0.2);
    border-radius: 14px;

    width: 77.17px;
    height: 38px;
`;

const AlarmText = styled.div`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 72px;
    letter-spacing: -0.5px;

    color: #F2F4F6;
`;

export default Alarm;