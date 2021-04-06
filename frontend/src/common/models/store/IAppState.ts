import { RouterState } from 'connected-react-router';
import { LocalizationState } from '../../../reducers/localization';
import { IUserState } from '../../../reducers/user';

export interface IAppState {
  router: RouterState;
  user: IUserState;
  localization: LocalizationState;
}
