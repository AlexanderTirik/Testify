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
}

export default UserRepository;
