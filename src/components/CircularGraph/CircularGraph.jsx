import styled from "styled-components";
import { useState, useEffect } from "react";
import useCustomTime from "../../zustand/useCustomTime";
import RotatingNumberDisplay from "components/RotatingNumberDisplay";

const COLOR = {
  active: "#F28888",
  inactive: "#565D73",
  background: "#000",
};

const TRANSITION_TIME = 1.5;

const CircularGraph = ( { shake, start, end }) => {
  const [ active, setActive ] = useState(false);
  const customTime = useCustomTime();

  useEffect( () => {
    setTimeout( () => {
      setActive(true);
    }, 800);
  }, [])

  return (
    <Wrapper start={active ? start : 0} end={active ? end : 0} className={`${shake ? "shake" : ""}`}>
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
        <div className={`digital ${active ? "show" : ""}`}>
          <div>
            <RotatingNumberDisplay number={ customTime.hour } css={`
              color: white;
              font-weight: 400;
              font-size: 40px;
            `} oneMarginLeft={-3}/>
          </div>:
          <div>
            <RotatingNumberDisplay number={ customTime.minute } css={`
              color: white;
              font-weight: 400;
              font-size: 40px;
            `} oneMarginLeft={-3}/>
          </div>:
          <div>
            <RotatingNumberDisplay number={ customTime.second } css={`
              color: white;
              font-weight: 400;
              font-size: 40px;
            `} oneMarginLeft={-3}
            on={active}
            />
          </div>
        </div>
        <AnalogueClock hour={customTime.hour} minute={customTime.minute} show={active}>
          <div />
        </AnalogueClock>
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
  animation: fadeIn 1s;

  &.shake {
    animation: shake 1s infinite;
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
    transition: transform ${TRANSITION_TIME}s;
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
    transition: transform ${TRANSITION_TIME}s;
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

    display: flex;
    justify-content: center;
    align-items: center;
    > div.digital {
      display: flex;
      align-items: center;
      opacity: 0;
      color: white;
      font-weight: 400;
      font-size: 40px;
      &.show {
        opacity: 1;
        transition: opacity 1s;
      }
      > div {
        position: relative;
        width: max-content;
        height: 50px;
      }
    }
  }
`;

const AnalogueClock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  transform: rotate( ${({hour, minute}) => hour * (360 / 24) + minute * (360 / 24 / 60) }deg );
  transition: transform ${TRANSITION_TIME}s;

  > div {
    width: 5px;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: ${({show}) => show ? 1 : 0 };
    transition: opacity 1s;
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

  transform: rotate( ${ ({degree}) => degree}deg );
  transition: transform ${TRANSITION_TIME}s;
`;

export default CircularGraph;