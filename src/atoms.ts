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
        { id: 0, text: 1 },
        { id: 1, text: 221 },
      ],
    },
    {
      title: 'DOING',
      id: 1,
      toDos: [
        { id: 3, text: 3 },
        { id: 4, text: 4 },
      ],
    },
    { title: 'DONE', id: 2, toDos: [] },
  ],
});
