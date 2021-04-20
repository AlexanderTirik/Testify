import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { ITest } from '../../common/models/test/ITest';
import { Test } from '../entities/Test';
import UserRepository from './UserRepository';

@EntityRepository(Test)
class TestRepository extends Repository<Test> {
  async createTest(userId: string, props: ITest) {
    const user = await getCustomRepository(UserRepository).findOne({ id: userId });
    const test = this.create({ ...props, user });
    await this.save(test);
    return test;
  }

  async findUserTests(userId: string) {
    const user = await getCustomRepository(UserRepository).findOne({ id: userId });
    const tests = this.find({ where: { user }, order: { createdAt: 'DESC' } });
    return tests;
  }

  async deleteTest(userId: string, testId: string) {
    const user = await getCustomRepository(UserRepository).findOne({ id: userId });
    const test = await this.find({ where: { id: testId, user } });
    await this.remove(test);
    return test;
  }

  async updateTest(userId: string, testId: string, props: ITest) {
    const user = await getCustomRepository(UserRepository).findOne({ id: userId });
    const test = await this.findOne({ where: { id: testId, user } });
    const updatedTest = await this.save({ ...test, ...props });
    return updatedTest;
  }
}

export default TestRepository;
