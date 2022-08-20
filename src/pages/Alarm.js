import React from 'react';
import Link from "../components/Link";
import styled, {css} from 'styled-components';
import Page from "../components/Page";
import Button from "../components/Button";
import Text from "../components/Text";

function Alarm() {
    return (
    <Page>
        <Box>
          <Text style={{fontSize: "36px"}}>기상시간</Text>
          <div>시계</div>
          <Text>멘트</Text>
          <Link to ="/messages">
              <Button style={{width: '61.5px', height: '38px'}}>중단</Button>
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

// const Title = styled.div`
//     font-family: 'NEXON Lv1 Gothic OTF';
//     font-style: normal;
//     font-weight: 400;
//     font-size: 36px;
//     line-height: 72px;
//     letter-spacing: -0.5px;

//     color: rgba(255, 255, 255, 0.87);
// `;


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