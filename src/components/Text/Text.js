import React from "react";
import styled from "styled-components";


function Text({style, ...rest}) {
  return (
    <TextRoot style={style} {...rest}></TextRoot>
  );
};

export default Text;

const TextRoot = styled.div`
    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 72px;
    letter-spacing: -0.5px;

    color: rgba(255, 255, 255, 0.87);
`;