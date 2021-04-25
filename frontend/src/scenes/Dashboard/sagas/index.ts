import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { ITest } from '../../../common/models/test/ITest';
import { createTest, deleteTest, fetchTests } from '../../../services/dashboardService';
import { createTestRoutine, deleteTestRoutine, fetchTestsRoutine } from '../routines';

function* fetchTestsRequest() {
  try {
    const tests: ITest[] = yield call(fetchTests);

    yield put(fetchTestsRoutine.success(tests));
  } catch (error) {
    yield put(fetchTestsRoutine.failure());
  }
}

function* watchFetchTestsRequest() {
  yield takeEvery(fetchTestsRoutine.TRIGGER, fetchTestsRequest);
}

function* createTestRequest({ payload }: any): Routine<any> {
  try {
    const test: ITest = yield call(createTest, payload);

    yield put(createTestRoutine.success(test));
  } catch (error) {
    yield put(createTestRoutine.failure());
  }
}

function* watchCreateTestRequest() {
  yield takeEvery(createTestRoutine.TRIGGER, createTestRequest);
}

function* deleteTestRequest({ payload }: any): Routine<any> {
  try {
    const test: ITest = yield call(deleteTest, payload);

    yield put(deleteTestRoutine.success(test.id));
  } catch (error) {
    yield put(deleteTestRoutine.failure());
  }
}

function* watchDeleteTestRequest() {
  yield takeEvery(deleteTestRoutine.TRIGGER, deleteTestRequest);
}

export default function* dashboardSaga() {
  yield all([
    watchFetchTestsRequest(),
    watchCreateTestRequest(),
    watchDeleteTestRequest()
  ]);
}
