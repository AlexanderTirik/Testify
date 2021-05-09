import { all } from 'redux-saga/effects';
import localizationSaga from '../containers/Localization/sagas';
import dashboardSaga from '../scenes/Dashboard/sagas';
import questionsSaga from '../scenes/Questions/sagas';
import resultsSaga from '../scenes/Results/sagas';
import testSaga from '../scenes/Test/sagas';
import userSaga from './user';

export default function* rootSaga() {
  yield all([
    userSaga(),
    localizationSaga(),
    dashboardSaga(),
    questionsSaga(),
    testSaga(),
    resultsSaga()
  ]);
}
