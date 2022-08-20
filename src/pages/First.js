import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled, {css} from 'styled-components';
import Logo from "../components/Logo";


function First() {
    return (
    <>
    <Link to="/home" style={{ textDecoration: 'none' }}>
        <Box>
          <Title>재우미</Title>
          <Logo></Logo>
        </Box>
    </Link>
    </>);
};


const Box = styled.body`
    background: linear-gradient(#232226, #3C4659);  
    height: 640px;
    width: 360px;

    display: flex;
    align-items: center;
    justify-content: center;
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

export default First;