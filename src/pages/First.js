import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled, {css} from 'styled-components';
import Logo from "../components/Logo";
import Page from "../components/Page";
import Text from "../components/Text";

function First() {
    return (
    <Page>
    <Link to="/home" style={{ textDecoration: 'none' }}>
        <Box>
          <Text style={{fontSize: "36px"}}>재우미</Text>
          <Logo></Logo>
        </Box>
    </Link>
    </Page>);
};


const Box = styled.body`
    background: linear-gradient(#232226, #3C4659);  
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;


export default First;