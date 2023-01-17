import { act } from '@testing-library/react';

const actualCreate = jest.requireActual('zustand');
const storeResetFns = new Set<() => void>();

const create = (createState: any) => {
  const store = actualCreate.default(createState);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

beforeEach(async () => {
  await act(() =>
    storeResetFns.forEach((resetFn) => {
      resetFn();
    }),
  );
});

export default create;
