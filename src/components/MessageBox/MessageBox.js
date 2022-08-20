import React from "react";
import styled, {ThemeProvider, css} from "styled-components";



function MessageBox({userName, date, content, children}) {
  return (
      <MessageBoxRoot>
        <UserInfoBox>
          <p>{userName}</p>
        </UserInfoBox>
      </MessageBoxRoot>
  );
}

export default MessageBox;

const MessageBoxRoot = styled.div`
  width: 168px;
  height: 150px;
  border-radius: 23.5px;
  background: #5F647B;

`;

const UserInfoBox = styled.div`
display: flex;
box-sizing: border-box;
  padding: 14px 30px;
  justify-content: space-between;

`;

MessageBox.defaultProps = {
  userName: '민지',
}