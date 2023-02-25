import { atom, selector } from 'recoil';

export const minutesState = atom({
  key: 'minutes',
  default: 0,
});

export const hourSelector = selector<number>({
  key: 'hours',
  get: ({ get }) => {
    const minutes = get(minutesState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    //minutesState를 10으로 만들겠다
    // set(minutesState,10)
    const minutes = +newValue * 60;
    set(minutesState, minutes);
  },
});
