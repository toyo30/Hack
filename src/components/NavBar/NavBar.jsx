import styled from "styled-components";
import Link from "../Link";

const NavBar = ({ index }) => {
  return (
    <StyledNavBar index={index}>
      <Link to="/messages">
        <div className={`button ${index === 0 ? "highlight" : ""}`}>MESSAGES</div>
      </Link>
      <Link to="/home">
        <div className={`button ${index === 1 ? "highlight" : ""}`}>HOME</div>
      </Link>
      <Link to="/mypage">
        <div className={`button ${index === 2 ? "highlight" : ""}`}>MYPAGE</div>
      </Link>
      <div className="border" />
    </StyledNavBar>
  );
};

const StyledNavBar = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  div.button {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 1.25px;
    color: rgba(60, 70, 89, 0.74);
    &.highlight {
      color: black;
    }
    &:not(.highlight) {
      cursor: pointer;
    }
  }
  div.border {
    position: absolute;
    width: calc(100% / 3);
    height: 2px;
    bottom: 0px;
    background-color: black;
    transform: translateX(${({ index }) => index * 100}%);
  }
`;

export default NavBar;
