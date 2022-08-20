import styled from "styled-components";
import { useState, useEffect } from "react";

const COLOR = {
  active: "#F28888",
  inactive: "#565D73",
  background: "#000",
};

const CircularGraph = ( { shake, start, end }) => {
  const [ active, setActive ] = useState(false);

  useEffect( () => {
    setTimeout( () => {
      setActive(true);
    }, 800);
  }, [])

  return (
    <Wrapper shake={shake} start={active ? start : 0} end={active ? end : 0}>
      <div className="background">
      </div>
      <div className="rotationBox">
        <div className="semiCircle fixed">
          <div>
            <div className={`${end - start >= 180 ? "filled" : ""}`}/>
          </div>
        </div>
        <div className="semiCircle rotate">
          <div>
            <div className="filled"/>
          </div>
        </div>
        <div className={`semiCircle hider ${end - start >= 180 ? "" : "active"}`}>
          <div>
            <div className=""/>
          </div>
        </div>
      </div>
      <div className="center">
      </div>
      { Array(24).fill(1).map( (_, index) => (
        <Divider key={index} degree={active ? index * 15 : 0} >
          <div />
          { (index == 12 || index === 0) && (
          <span>
            12
          </span>
          )}
        </Divider>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-5px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(3px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-8px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(8px, 0, 0);
    }
  }
  position: relative;
  width: 100%;
  aspect-ratio: 1/ 1;
  animation: fadeIn 1s ${({shake}) => shake ? ", shake 1s 1.5s infinite" : ""};
  

  * {
    transition: transform 0.5s;
  }

  .background {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    aspect-ratio: 1/ 1;
    border-radius: 100%;
    background-color: ${COLOR.inactive};
  }
  .rotationBox {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    aspect-ratio: 1/ 1;

    transform: rotate( ${({start}) => start}deg );
  }

  .semiCircle {
    position: absolute;
    width: 100%;
    aspect-ratio: 1/ 1;
    overflow: hidden;
    > div {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      aspect-ratio: 2/ 1;
      overflow: hidden;
      > div {
        position: absolute;
        width: 100%;
        aspect-ratio: 1/ 1;
        background-color: ${COLOR.inactive};
        border-radius: 100%;
        &.filled {
          background-color: ${COLOR.active};
        }
      }
    }
  }
  .fixed {
    transform: rotate(90deg);
  }
  .rotate {
    transform: rotate( ${({ start, end }) => end - start - 90 }deg);
  }
  .hider {
    &:not(.active) {
      display: none;
    }
    transform: rotate(-90deg);
  }
  .center {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto auto;
    width: 80%;
    aspect-ratio: 1/ 1;
    border-radius: 100%;
    background-color: ${COLOR.background};
  }
`;

const Divider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;

  > div {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 40px;
    width: 5px;
    height: 10px;
    background-color: #fff; 
  }
  > span {
    text-align: center;
    margin-top: 60px;
    color: white;
    font-weight: 500;
  }

  transform: rotate( ${({degree}) => degree}deg );
`;

export default CircularGraph;