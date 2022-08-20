import React from "react";
import styled from "styled-components";


function InputField({children, onClick, backgroundColor, style, ...rest}) {
  return (
      <InputFieldRoot style={style} {...rest}></InputFieldRoot>
  );
}

export default InputField;

const InputFieldRoot=styled.input`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent !important;

    border: 0;
    outline: 0;
    margin: 9px;
    border-radius: 0;
    padding: 0px 15px ;

    user-select: none;
    vertical-align: middle;
    moz-appearance: none; 
    /*Reset*/
    -webkit-appearance: none; // Reset
    text-decoration: none,
    color: inherit;
    '&::-moz-focus-inner': {
    border-style: none; // Remove Firefox dotted outline.
    };

    font-family: 'NEXON Lv1 Gothic OTF';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: -0.5px;

    color: #F2F4F6;

    background: rgba(242, 244, 246, 0.2);
    border-radius: 14px;

    width: 290px;
    height: 47px;
`;
