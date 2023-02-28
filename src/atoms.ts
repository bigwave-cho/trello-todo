import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

export interface IBoard {
  id: number;
  title: string;
  toDos: IToDo[];
}

export const toDoState = atom<IBoard[]>({
  key: 'toDo',
  default: JSON.parse(localStorage.getItem('toDos')!) ?? [
    {
      title: 'TO DO',
      id: 0,
      toDos: [
        { id: 0, text: '할 일을 추가해보세요!' },
        { id: 1, text: '즐거워 코딩' },
      ],
    },
    {
      title: 'DOING',
      id: 1,
      toDos: [
        { id: 3, text: '짬뽕 조아' },
        { id: 4, text: '야식 좋아!' },
      ],
    },
    { title: 'DONE', id: 2, toDos: [] },
  ],
});
