import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { StudentAnswer } from '../entities/StudentAnswer';
import TestRepository from './TestRepository';
import UserRepository from './UserRepository';
import QuestionRepository from './QuestionRepository';
import AnswerOptionRepository from './AnswerOptionRepository';
import { Question } from '../entities/Question';
import { checkCorrectness } from '../../common/helpers/answerCorrectnessHelper';
import { IUser } from '../../common/models/user/IUser';

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

  async findTestUsers(testId: string) {
    const users = await this.createQueryBuilder('student_answer')
      .select('user.id', 'id')
      .addSelect('user.displayName', 'displayName')
      .leftJoin('student_answer.user', 'user')
      .distinct(true)
      .where('student_answer.testId IN (:...testId)', { testId: [testId] })
      .getRawMany();
    return users;
  }

  async findTestQuestionStudentOptions(questionId: string, userId: string, testId: string) {
    const options = await this.createQueryBuilder('student_answer')
      .select()
      .innerJoinAndSelect('student_answer.answerOption', 'answer_option',
        'answer_option.id = student_answer."answerOptionId"')
      .where('answer_option."questionId" IN (:...questionId)', { questionId: [questionId] })
      .andWhere('student_answer."userId" IN (:...userId)', { userId: [userId] })
      .andWhere('student_answer."testId" IN (:...testId)', { testId: [testId] })
      .orderBy('answer_option."createdAt"', 'DESC')
      .getMany();
    const optionsIds = options.map(o => o.answerOption.id);
    return optionsIds;
  }

  async findResults(testId: string) {
    const users = await this.findTestUsers(testId);
    const questions = await getCustomRepository(QuestionRepository).findTestQuestions(testId);
    const correctOptions = await Promise.all(
      questions.map(async (q: Question) => {
        const co = await getCustomRepository(AnswerOptionRepository).findQuestionCorrectOptionsIds(q.id);
        return co;
      })
    );
    const results = await Promise.all(
      users.map(async (user: IUser) => {
        const userOptions = await Promise.all(
          questions.map(async (question: Question) => {
            const userQuestionOptions = await this.findTestQuestionStudentOptions(question.id, user.id, testId);
            return userQuestionOptions;
          })
        );
        const correctness = questions.map((_, index) => checkCorrectness(correctOptions[index], userOptions[index]));
        return { user, correctness };
      })
    );
    return results;
  }
}

export default StudentAnswerRepository;
