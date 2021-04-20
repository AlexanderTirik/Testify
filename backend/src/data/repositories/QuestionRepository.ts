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

  async deleteQuestion(testId: string, questionId: string) {
    const question = await this.createQueryBuilder()
      .relation(Question, 'tests')
      .of({ id: questionId })
      .remove({ id: testId });
    return question;
  }

  async updateQuestion(testId: string, questionId: string, props: IQuestion) {
    const question = await this.findOne({ id: questionId });
    const answerOptions = await getCustomRepository(AnswerOptionRepository).findQuestionAnswerOptions(question.id);
    console.log(answerOptions);
    return question;
    // await this.save({ ...question, ...props });
  }
}

export default QuestionRepository;
