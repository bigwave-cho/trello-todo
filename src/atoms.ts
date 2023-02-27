import { atom } from 'recoil';

interface IToDoState {
  //중요!! atom state 확장성을 주기 위해 타입스크립트 사용
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: { to_do: ['a', 'b', 'c', 'd', 'e', 'f'], doing: [], done: [] },
});
