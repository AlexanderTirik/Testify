import { getCustomRepository } from 'typeorm';
import { fromTestToITest } from '../common/mappers/Test';
import { ITest } from '../common/models/test/ITest';
import TestRepository from '../data/repositories/TestRepository';

export const getUserTests = async (userId: string) => {
  const tests = await getCustomRepository(TestRepository).findUserTests(userId);
  return tests.map(t => fromTestToITest(t));
};

export const getTest = async (id: string) => {
  const test = await getCustomRepository(TestRepository).findTest(id);
  return fromTestToITest(test);
};

export const createTest = async (userId: string, testData: ITest) => {
  const createdTest = await getCustomRepository(TestRepository).createTest(userId, testData);
  return fromTestToITest(createdTest);
};

export const deleteTest = async (userId: string, testId: string) => {
  const deletedTest = await getCustomRepository(TestRepository).deleteTest(userId, testId);
  return fromTestToITest(deletedTest);
};

export const updateTest = async (userId: string, testId: string, testData: ITest) => {
  const updatedTest = await getCustomRepository(TestRepository).updateTest(userId, testId, testData);
  return fromTestToITest(updatedTest);
};
