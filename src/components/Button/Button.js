import React from "react";
import styled from "styled-components";


function Button({children, onClick, backgroundColor, style, ...rest}) {
  return (
      <ButtonRoot style={style} {...rest} onClick={onClick}>{children}</ButtonRoot>
  );
}

export default Button;

const ButtonRoot = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: transparent;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent !important;
    border: 0;
    outline: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    moz-appearance: none; /*Reset*/
    -webkit-appearance: none; // Reset
    text-decoration: none,
    color: inherit;
    '&::-moz-focus-inner': {
    border-style: none; // Remove Firefox dotted outline.
    };
`;
