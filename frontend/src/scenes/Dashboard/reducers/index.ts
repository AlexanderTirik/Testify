import { Routine } from 'redux-saga-routines';
import { ITest } from '../../../common/models/test/ITest';
import { fetchTestsRoutine } from '../routines';

export type IDashboardState = {
  isLoading: boolean;
  tests: ITest[];
}

const initialState = {
  tests: [],
  isLoading: false
};

const dashboard = (state: IDashboardState = initialState, action: Routine<any>): IDashboardState => {
  switch (action.type) {
    case fetchTestsRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchTestsRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        tests: action.payload
      };
    case fetchTestsRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default dashboard;
