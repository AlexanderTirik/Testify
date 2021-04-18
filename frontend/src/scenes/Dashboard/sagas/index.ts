import { all, put, call, takeEvery } from 'redux-saga/effects';
import { ITest } from '../../../common/models/test/ITest';
import { fetchTests } from '../../../services/dashboardService';
import { fetchTestsRoutine } from '../routines';

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

export default function* dashboardSaga() {
  yield all([
    watchFetchTestsRequest()
  ]);
}
