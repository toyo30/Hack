import styled from "styled-components";
import useCustomTime from "../../zustand/useCustomTime";
import { useEffect, useState } from "react";

const Page = ({ children }) => {
  const customTime = useCustomTime();

  const [ isCounterOn, setIsCounterOn ] = useState(true);
  
  useEffect( () => {
    let intervalId;
    if ( isCounterOn ) {
      intervalId = setInterval( () => customTime.addOneSecond(), 1000 );
    }
    return () => clearInterval(intervalId);
  }, [isCounterOn])

  return (
    <StyledPage>
      <div className="children">{children}</div>
      <div className="console">
        <div>
          <button onClick={ () => customTime.setYear( customTime.year - 1 )}>-</button>
            <span>
              year: {customTime.year}
            </span>
          <button onClick={ () => customTime.setYear( customTime.year + 1 )}>+</button>
        </div>
        <div>
          <button onClick={ () => customTime.setMonth( customTime.month - 1 )}>-</button>
            <span>
              month: {customTime.month}
            </span>
          <button onClick={ () => customTime.setMonth( customTime.month + 1 )}>+</button>
        </div>
        <div>
          <button onClick={ () => customTime.setDate( customTime.date - 1 )}>-</button>
            <span>
              date: {customTime.date}
            </span>
          <button onClick={ () => customTime.setDate( customTime.date + 1 )}>+</button>
        </div>
        <div>
          <button onClick={ () => customTime.setHour( customTime.hour - 1 )}>-</button>
            <span>
              hour: {customTime.hour}
            </span>
          <button onClick={ () => customTime.setHour( customTime.hour + 1 )}>+</button>
        </div>
        <div>
          <button onClick={ () => customTime.setMinute( customTime.minute - 1 )}>-</button>
            <span>
              minute: {customTime.minute}
            </span>
          <button onClick={ () => customTime.setMinute( customTime.minute + 1 )}>+</button>
        </div>
        <div>
          <button onClick={ () => customTime.setSecond( customTime.second - 1 )}>-</button>
            <span>
              second: {customTime.second}
            </span>
          <button onClick={ () => customTime.setSecond( customTime.second + 1 )}>+</button>
        </div>
        <button onClick={() => setIsCounterOn( (prev) => !prev)}>자동</button>
        
      </div>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(160, 160, 160);
  > div.children {
    position: absolute;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    width: 360px;
    height: 640px;
    background-color: white;
  }

  > div.console {
    position: absolute;
    background-color: white;
    top: 100px;
    left: 100px;
    width: max-content;
    height: max-content;

    display: flex;
    flex-direction: column;
    gap: 5px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default Page;
