import { getCustomRepository } from 'typeorm';
import { fromTestToITest } from '../common/mappers/Test';
import { ITest } from '../common/models/test/ITest';
import StudentAnswerRepository from '../data/repositories/StudentAnswerRepository';
import TestRepository from '../data/repositories/TestRepository';

export const getTestResults = async (testId: string) => {
  const results = await getCustomRepository(StudentAnswerRepository).findResults(testId);
  return results;
};

export const getUserTests = async (userId: string) => {
  const tests = await getCustomRepository(TestRepository).findUserTests(userId);
  return tests.map(t => fromTestToITest(t, false));
};

export const getTest = async (id: string, userId: string) => {
  const test = await getCustomRepository(TestRepository).findTest(id);
  const results = await getTestResults(id);
  const taken = results.some(result => result.user.id === userId);
  return fromTestToITest(test, taken);
};

export const createTest = async (userId: string, testData: ITest) => {
  const createdTest = await getCustomRepository(TestRepository).createTest(userId, testData);
  return fromTestToITest(createdTest, false);
};

export const deleteTest = async (userId: string, testId: string) => {
  const deletedTest = await getCustomRepository(TestRepository).deleteTest(userId, testId);
  return fromTestToITest(deletedTest, false);
};

export const updateTest = async (userId: string, testId: string, testData: ITest) => {
  const updatedTest = await getCustomRepository(TestRepository).updateTest(userId, testId, testData);
  return fromTestToITest(updatedTest, false);
};

