import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  //중요!! atom state 확장성을 주기 위해 타입스크립트 사용
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': [
      { id: 1, text: 'hello' },
      { id: 2, text: 'hi' },
    ],
    doing: [],
    done: [],
  },
});
