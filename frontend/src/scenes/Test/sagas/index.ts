import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { ITest } from '../../../common/models/test/ITest';
import { fetchTest } from '../../../services/testService';
import { fetchTestRoutine } from '../routines';

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

export default function* testSaga() {
  yield all([
    watchFetchTestRequest()
  ]);
}
