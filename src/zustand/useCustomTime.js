import create from "zustand";

const useCustomTime = create( set => ( {
  date: 21,
  month: 8,
  year: 2022,
  second: 0,
  minute: 0,
  hour: 1,

  setDate: (date) => set( () => ({ date: date })),
  setMonth: (month) => set( () => ({ month: month })),
  setYear: (year) => set( () => ({ year: year })),
  setSecond: (second) => set( () => ({ second: second })),
  setMinute: (minute) => set( () => ({ minute: minute })),
  setHour: (hour) => set( () => ({ hour: hour })),

  addOneSecond: () => set( (state) => {
    //일 변경까지만 구현하겠음 월 변경, 년도 변경은 없음
    let newSecond = state.second;
    let newMinute = state.minute;
    let newHour = state.hour;
    let newDate = state.date;
    if ( state.second == 59 ) {
      if ( state.minute == 59 ) {
        if ( state.hour == 23 ) {
          newDate += 1;
        }
          newHour += 1;          
      }
        newMinute += 1;
    newSecond = 0;
    } else {
      newSecond += 1;
    }
    return {
      date: newDate,
      hour: newHour,
      minute: newMinute,
      second: newSecond
    }
  } 
  )
}));

export default useCustomTime;