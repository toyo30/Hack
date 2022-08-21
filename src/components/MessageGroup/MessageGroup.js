import React from "react";
import styled, {ThemeProvider, css} from "styled-components";

const theme = {
  currentType: '',
  color: {
      night: {
        background: 'rgba(129, 131, 158, 1)',
        userInfo: 'rgba(255, 255, 255, 0.87)',
        content: '#FBFBFB',
      },
      day: {
        background: '#FBFBFB',
        userInfo: 'rgba(60, 70, 89, 0.87)',
        content: 'rgba(60, 70, 89, 0.87)',
      },

  }
}


function MessageGroup({type, userName, date, content, children, ...rest}) {
  theme.currentType = type;
  console.log(theme.currentType);
  return (
    <ThemeProvider theme={theme}>
      <MessageGroupRoot>
        {children}
      </MessageGroupRoot>
      </ThemeProvider>
  );
}

export default MessageGroup;

const MessageGroupRoot = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; 
    

`;


// MessageBox.defaultProps = {
//   userName: '민지',
//   date: '8/16 09:03',
//   type:'night',
//   content: '맨날 과제 미루는 습관 좀 고치고 일찍 자라,,',
// }