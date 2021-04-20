import { getCustomRepository } from 'typeorm';
import { fromTestToITest } from '../common/mappers/Test';
import { ITest } from '../common/models/test/ITest';
import TestRepository from '../data/repositories/TestRepository';

export const getUserTests = async (userId: string) => {
  const tests = await getCustomRepository(TestRepository).findUserTests(userId);
  return tests.map(t => fromTestToITest(t));
};

export const createTest = async (userId: string, testData: ITest) => {
  const createdTest = await getCustomRepository(TestRepository).createTest(userId, testData);
  return fromTestToITest(createdTest);
};

export const deleteTest = async (userId: string, testId: string) => {
  const deletedTest = await getCustomRepository(TestRepository).deleteTest(userId, testId);
  return deletedTest;
};
