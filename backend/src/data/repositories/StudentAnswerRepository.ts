import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { StudentAnswer } from '../entities/StudentAnswer';
import TestRepository from './TestRepository';
import UserRepository from './UserRepository';
import QuestionRepository from './QuestionRepository';
import AnswerOptionRepository from './AnswerOptionRepository';
import { Question } from '../entities/Question';
import { checkCorrectness } from '../../common/helpers/answerCorrectnessHelper';

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
      .select('student_answer.userId')
      .distinct(true)
      .where('student_answer.testId IN (:...testId)', { testId: [testId] })
      .getRawMany();
    const usersIds = users.map(u => u.userId);
    return usersIds;
  }

  async findTestQuestionStudentOptions(questionId: string, userId: string) {
    const options = await this.createQueryBuilder('student_answer')
      .select()
      .innerJoinAndSelect('student_answer.answerOption', 'answer_option',
        'answer_option.id = student_answer."answerOptionId"')
      .where('answer_option."questionId" IN (:...questionId)', { questionId: [questionId] })
      .andWhere('student_answer."userId" IN (:...userId)', { userId: [userId] })
      .orderBy('answer_option."createdAt"', 'DESC')
      .getMany();

    console.log('questionId:', questionId);
    console.log('userId:', userId);

    console.log('!!!:', options);

    const tmp = options.map(o => ({
      text: o.answerOption.text,
      id: o.answerOption.id,
      questionId: o.questionId,
      userId: o.userId
    }));
    console.log(tmp);
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
    console.log(correctOptions);
    const results = await Promise.all(
      users.map(async (userId: string) => {
        const userOptions = await Promise.all(
          questions.map(async (question: Question) => {
            const userQuestionOptions = await this.findTestQuestionStudentOptions(question.id, userId);
            // console.log('user:', userId);
            // console.log('options:', userQuestionOptions);
            return userQuestionOptions;
          })
        );
        const correctness = questions.map((_, index) => checkCorrectness(correctOptions[index], userOptions[index]));
        return { userId, correctness };
      })
    );
    return results;
  }
}

export default StudentAnswerRepository;
