import { EntityRepository, getCustomRepository, In, Repository } from 'typeorm';
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
    const test = await getCustomRepository(TestRepository).findOne({ id: testId });
    const questions = await this.find({ where: { tests: In([test]) }, order: { createdAt: 'DESC' } });
    return questions;
  }
}

export default QuestionRepository;
