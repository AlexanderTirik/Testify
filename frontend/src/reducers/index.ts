import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import user from './user';
import localization from './localization';
import dashboard from '../scenes/Dashboard/reducers';
import { history } from '../common/helpers/historyHelper';

export default combineReducers({
  router: connectRouter(history),
  user,
  localization,
  dashboard
});
