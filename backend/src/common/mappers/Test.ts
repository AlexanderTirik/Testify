import { Test } from '../../data/entities/Test';

export const fromTestToITest = (test: Test) => {
  const { name, start, end } = test;
  return { name, start, end };
};
