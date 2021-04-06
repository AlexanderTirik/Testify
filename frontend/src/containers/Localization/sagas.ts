import { Routine } from 'redux-saga-routines';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getTranslation } from '../../services/localizationService';
import { getTranslationRoutine, setLocalizationRoutine } from './routines';

function* getTranslations({ payload }: Routine<any>): any {
  try {
    const translations = yield call(getTranslation, payload.localization);
    yield put(getTranslationRoutine.success({ translations }));
  } catch (error) {
    yield put(getTranslationRoutine.failure(error.message));
  }
}

function* watchGetTranslations() {
  yield takeEvery(getTranslationRoutine.TRIGGER, getTranslations);
}

function* watchSetLocalization() {
  yield takeEvery(setLocalizationRoutine.TRIGGER, getTranslations);
}

export default function* localizationSaga() {
  yield all([
    watchGetTranslations(),
    watchSetLocalization()
  ]);
}
