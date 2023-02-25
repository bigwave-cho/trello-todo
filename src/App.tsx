import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minutesState } from './atoms';

function App() {
  /*
  selector를 이용해서 state를 원하는대로
  걸러 받을 수도 있고 역으로 state를 수정도 가능하다.

  useRecoilState의 state
  atom : atom value
  selecor : get함수의 값
  
  두번째 요소
  atom : atom 수정함수
  selector : set 함수 실행
  */
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <>
      <div className="App">
        <input
          value={minutes}
          onChange={onMinutesChange}
          type="number"
          placeholder="Minutes"
        />
        <input
          value={hours}
          onChange={onHoursChange}
          type="number"
          placeholder="Hours"
        />
      </div>
    </>
  );
}

export default App;
