import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { AnswerOption } from '../entities/AnswerOption';
import { IAnswerOption } from '../../common/models/answerOption/IAnswerOption';
import QuestionRepository from './QuestionRepository';

@EntityRepository(AnswerOption)
class UserRepository extends Repository<AnswerOption> {
  async createAnswerOption(questionId: string, props: IAnswerOption) {
    const question = await getCustomRepository(QuestionRepository).findOne({ id: questionId });
    const answerOption = this.create({ ...props, questions: [question] });
    await this.save(answerOption);
    return answerOption;
  }

  async findQuestionAnswerOptions(questionId: string) {
    const answerOptions = await this.createQueryBuilder('answer_option')
      .select()
      .leftJoin('answer_option.questions', 'question')
      .where('question.id = :questionId', { questionId })
      .getMany();
    return answerOptions;
  }

  async updateAnswerOption(answerOptionId: string, props: IAnswerOption) {
    const answerOption = await this.findOne({ where: { id: answerOptionId } });
    const updatedOption = await this.save({ ...answerOption, ...props });
    return updatedOption;
  }
}

export default UserRepository;
