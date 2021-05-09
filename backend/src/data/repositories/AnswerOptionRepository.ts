import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { AnswerOption } from '../entities/AnswerOption';
import { IAnswerOption } from '../../common/models/answerOption/IAnswerOption';
import QuestionRepository from './QuestionRepository';

@EntityRepository(AnswerOption)
class AnswerOptionRepository extends Repository<AnswerOption> {
  async createAnswerOption(questionId: string, props: IAnswerOption) {
    const question = await getCustomRepository(QuestionRepository).findOne({ id: questionId });
    const answerOption = this.create({ ...props, question });
    await this.save(answerOption);
    return answerOption;
  }

  async findQuestionAnswerOptions(questionId: string) {
    const question = await getCustomRepository(QuestionRepository).findOne({ id: questionId });
    const answerOptions = await this.find({ where: { question }, order: { createdAt: 'DESC' } });
    return answerOptions;
  }

  async findQuestionCorrectOptionsIds(questionId: string) {
    const question = await getCustomRepository(QuestionRepository).findOne({ id: questionId });
    const correctOptions = await this.find({ where: { question, isCorrect: true }, order: { createdAt: 'DESC' } });
    const correctOptiondIds = correctOptions.map(co => co.id);
    return correctOptiondIds;
  }

  // async updateAnswerOption(answerOptionId: string, props: IAnswerOption) {
  //   const answerOption = await this.findOne({ where: { id: answerOptionId } });
  //   const updatedOption = await this.save({ ...answerOption, ...props });
  //   return updatedOption;
  // }
}

export default AnswerOptionRepository;
