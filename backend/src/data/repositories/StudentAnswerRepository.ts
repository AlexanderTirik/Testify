import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { StudentAnswer } from '../entities/StudentAnswer';
import TestRepository from './TestRepository';
import UserRepository from './UserRepository';
import QuestionRepository from './QuestionRepository';
import AnswerOptionRepository from './AnswerOptionRepository';

@EntityRepository(StudentAnswer)
class StudentAnswerRepository extends Repository<StudentAnswer> {
  async answerQuestion(userId: string, testId: string, questionId: string, answerIds: string[]) {
    const test = await getCustomRepository(TestRepository).findOne({ id: testId });
    const user = await getCustomRepository(UserRepository).findOne({ id: userId });
    const question = await getCustomRepository(QuestionRepository).findOne({ id: questionId });
    const answers = await Promise.all(
      answerIds.map(async (id: string) => {
        const answerOption = await getCustomRepository(AnswerOptionRepository).findOne({ id });
        return this.create({ test, user, question, answerOption });
      })
    );
    this.save(answers);
  }
}

export default StudentAnswerRepository;
