import { RouterState } from 'connected-react-router';
import { LocalizationState } from '../../../reducers/localization';
import { IUserState } from '../../../reducers/user';
import { IDashboardState } from '../../../scenes/Dashboard/reducers';
import { IQuestionsState } from '../../../scenes/Questions/reducers';
import { ITestState } from '../../../scenes/Test/reducers';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  localization: LocalizationState;
  dashboard: IDashboardState;
  questions: IQuestionsState;
  test: ITestState;
}
