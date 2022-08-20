import React from "react";
import styled from "styled-components";

function Typography({ children, onClick, backgroundColor, style, ...rest }) {
  return (
    <TypographyRoot style={style} {...rest} onClick={onClick}>
      {children}
    </TypographyRoot>
  );
}

export default Typography;

const TypographyRoot = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 45px;
  color: #ffffff;
`;
