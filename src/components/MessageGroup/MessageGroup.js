import React from "react";
import styled, {ThemeProvider, css} from "styled-components";

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
        background: '#FBFBFB',
        userInfo: 'rgba(60, 70, 89, 0.87)',
        content: 'rgba(60, 70, 89, 0.87)',
        boxBackground: '#FBFBFB',
      },

  }
}


function MessageGroup({type, userName, date, content, children, ...rest}) {
  theme.currentType = type;
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
position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; 
    background: ${(props) => props.theme.color[props.theme.currentType].boxBackground};
    padding: 19px 0;
    

`;


MessageGroup.defaultProps = {
  type:'night',
}