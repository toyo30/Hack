import React from "react";
import styled, {ThemeProvider, css} from "styled-components";
import PlusIcon from "../PlusIcon";

const theme = {
  currentType: '',
  color: {
      night: {
        background: '#5F647B',
        userInfo: 'rgba(255, 255, 255, 0.87)',
        content: '#FBFBFB',
        boxBackground: '#81839E',
      },
      day: {
        background: '#F2F4F6',
        userInfo: 'rgba(60, 70, 89, 0.87)',
        content: 'rgba(60, 70, 89, 0.87)',
        boxBackground: '#FBFBFB',
      },

  }
}


function MessageBox({add, type, userName, date, content, children, ...rest}) {
  theme.currentType = type;

  if(add) {
    return (<ThemeProvider theme={theme}>
      <MessageBoxRoot style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <PlusIcon/>
      </MessageBoxRoot>
    </ThemeProvider>)
  } 

  return (
    <ThemeProvider theme={theme}>
      <MessageBoxRoot>
        <UserInfoBox>
          <p>{userName}</p>
          <p>{date}</p>
        </UserInfoBox>
        <ContentBox>
          {content}
        </ContentBox>
      </MessageBoxRoot>
    </ThemeProvider>
  );
}

export default MessageBox;

const MessageBoxRoot = styled.div`
  //width: 168px;
  width: 150px;
  height: 150px;
  border-radius: 23.5px;
  background: ${(props) => props.theme.color[props.theme.currentType].background};
  margin-bottom: 19px;

`;

const UserInfoBox = styled.div`

  display: flex;
  box-sizing: border-box;
  padding: 14px 30px;
  justify-content: space-between;
  & p {
    color: ${(props) => props.theme.color[props.theme.currentType].userInfo};
    font-size: 11px;
  }
 


`;


const ContentBox = styled.div`
  word-break: keep-all;
  padding: 0 24px;
  justify-content: space-between;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.color[props.theme.currentType].content};
 

`;


MessageBox.defaultProps = {
  userName: '민지',
  date: '8/16 09:03',
  type:'night',
  content: '맨날 과제 미루는 습관 좀 고치고 일찍 자라,,',
}