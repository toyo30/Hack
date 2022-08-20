import create from "zustand";

const validate = ( { date, month, year, second, minute, hour } ) => {
  //일 변경까지만 구현함. 월과 년도 변경은 없다.
  const newTime = {
    date, month, year, second, minute, hour
  };
  
  if ( newTime.second > 59 ) {
    newTime.second = 0;
    newTime.minute += 1;
  }
  if ( newTime.minute > 59 ) {
    newTime.minute = 0;
    newTime.hour += 1;
  }
  if ( newTime.hour > 23 ) {
    newTime.hour = 0;
    newTime.date += 1;
  }
  if ( newTime.second < 0 ) {
    newTime.second = 59;
    newTime.minute -= 1;
  }
  if ( newTime.minute < 0 ) {
    newTime.minute = 59;
    newTime.hour -= 1;
  }
  if ( newTime.hour < 0 ) {
    newTime.hour = 23;
    newTime.date -= 1;
  }
  return newTime;
}

const useCustomTime = create( set => ( {
  date: 21,
  month: 8,
  year: 2022,
  second: 20,
  minute: 30,
  hour: 15,

  setDate: (date) => set( () => ({ date: date })),
  setMonth: (month) => set( () => ({ month: month })),
  setYear: (year) => set( () => ({ year: year })),
  setSecond: (second) => set( (state) => validate({ ...state, second: second })),
  setMinute: (minute) => set( (state) => validate({ ...state, minute: minute })),
  setHour: (hour) => set( (state) => validate({ ...state, hour: hour })),

  addOneSecond: () => set( ( state ) => validate({ ...state, second: state.second + 1 }) ),
}));

export default useCustomTime;