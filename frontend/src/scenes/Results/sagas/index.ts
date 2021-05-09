import { Routine } from 'redux-saga-routines';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { IResult } from '../../../common/models/results/IResult';
import { fetchResults } from '../../../services/resultsService';
import { fetchResultsRoutine } from '../routines';

function* fetchReslutsRequest({ payload }: any): Routine<any> {
  try {
    const results: IResult[] = yield call(fetchResults, payload);

    yield put(fetchResultsRoutine.success(results));
  } catch (error) {
    yield put(fetchResultsRoutine.failure());
  }
}

function* watchFetchReslutsRequest() {
  yield takeEvery(fetchResultsRoutine.TRIGGER, fetchReslutsRequest);
}
export default function* resultsSaga() {
  yield all([
    watchFetchReslutsRequest()
  ]);
}
