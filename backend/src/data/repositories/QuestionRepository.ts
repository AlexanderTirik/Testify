import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IQuestion } from '../../common/models/question/IQuestion';
import { Question } from '../entities/Question';
import TestRepository from './TestRepository';
import AnswerOptionRepository from './AnswerOptionRepository';

@EntityRepository(Question)
class QuestionRepository extends Repository<Question> {
  async createQuestion(testId: string, props: IQuestion) {
    const test = await getCustomRepository(TestRepository).findOne({ id: testId });
    const question = this.create({ ...props, tests: [test] });
    const answerOptionCustomRepository = getCustomRepository(AnswerOptionRepository);
    props.answerOptions.forEach(async answerOption => {
      await answerOptionCustomRepository.createAnswerOption(question.id, answerOption);
    });
    await this.save(question);
    return question;
  }

  async findTestQuestions(testId: string) {
    const questions = await this.createQueryBuilder('question')
      .select()
      .leftJoin('question.tests', 'test')
      .where('test.id IN (:...testId)', { testId: [testId] })
      .getMany();
    return questions;
  }

  async deleteQuestion(id: string) {
    return this.delete(id);
  }
}

export default QuestionRepository;
