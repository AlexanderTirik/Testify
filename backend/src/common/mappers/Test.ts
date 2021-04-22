import { Test } from '../../data/entities/Test';

export const fromTestToITest = (test: Test) => {
  const { id, name, start, end } = test;
  return { id, name, start, end };
};
