import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { IStudentQuestion } from '../../../common/models/question/IStudentQuestion';
import { ITest } from '../../../common/models/test/ITest';
import { fetchStudentQuestions, sendAnswer } from '../../../services/questionsService';
import { fetchTest } from '../../../services/testService';
import { fetchStudentQuestionsRoutine, fetchTestRoutine, sendAnswerRoutine } from '../routines';

function* fetchTestRequest({ payload }: any): Routine<any> {
  try {
    const test: ITest = yield call(fetchTest, payload);

    yield put(fetchTestRoutine.success(test));
  } catch (error) {
    yield put(fetchTestRoutine.failure());
  }
}

function* watchFetchTestRequest() {
  yield takeEvery(fetchTestRoutine.TRIGGER, fetchTestRequest);
}

function* fetchStudentQuestionsRequest({ payload }: any): Routine<any> {
  try {
    const questions: IStudentQuestion[] = yield call(fetchStudentQuestions, payload);

    yield put(fetchStudentQuestionsRoutine.success(questions));
  } catch (error) {
    yield put(fetchStudentQuestionsRoutine.failure());
  }
}

function* watchFetchStudentQuestionsRequest() {
  yield takeEvery(fetchStudentQuestionsRoutine.TRIGGER, fetchStudentQuestionsRequest);
}

function* sendAnswerRequest({ payload }: any): Routine<any> {
  try {
    yield call(sendAnswer, payload);

    yield put(sendAnswerRoutine.success());
  } catch (error) {
    yield put(sendAnswerRoutine.failure());
  }
}

function* watchSendAnswerRequest() {
  yield takeEvery(sendAnswerRoutine.TRIGGER, sendAnswerRequest);
}

export default function* testSaga() {
  yield all([
    watchFetchTestRequest(),
    watchSendAnswerRequest(),
    watchFetchStudentQuestionsRequest()
  ]);
}
