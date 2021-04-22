import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { IQuestion } from '../../../common/models/question/IQuestion';
import { createQuestion, fetchQuestions } from '../../../services/questionsService';
import { createQuestionRoutine, fetchQuestionsRoutine } from '../routines';

function* fetchQuestionsRequest({ payload }: any): Routine<any> {
  try {
    const questions: IQuestion[] = yield call(fetchQuestions, payload);

    yield put(fetchQuestionsRoutine.success(questions));
  } catch (error) {
    yield put(fetchQuestionsRoutine.failure());
  }
}

function* watchFetchQuestionsRequest() {
  yield takeEvery(fetchQuestionsRoutine.TRIGGER, fetchQuestionsRequest);
}

function* createQuestionRequest({ payload }: any): Routine<any> {
  try {
    const question: IQuestion = yield call(createQuestion, payload.testId, payload.question);

    yield put(createQuestionRoutine.success(question));
  } catch (error) {
    yield put(createQuestionRoutine.failure());
  }
}

function* watchCreateQuestionRequest() {
  yield takeEvery(createQuestionRoutine.TRIGGER, createQuestionRequest);
}

export default function* questionsSaga() {
  yield all([
    watchFetchQuestionsRequest(),
    watchCreateQuestionRequest()
  ]);
}
