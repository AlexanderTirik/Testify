import { Routine } from 'redux-saga-routines';
import { ITest } from '../../../common/models/test/ITest';
import { createTestRoutine, fetchTestsRoutine, deleteTestRoutine } from '../routines';

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
    case createTestRoutine.TRIGGER:
    case fetchTestsRoutine.TRIGGER:
    case deleteTestRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case createTestRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        tests: [action.payload, ...state.tests]
      };
    case fetchTestsRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        tests: action.payload
      };
    case deleteTestRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        tests: state.tests.filter(t => t.id !== action.payload)
      };
    case createTestRoutine.FAILURE:
    case fetchTestsRoutine.FAILURE:
    case deleteTestRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default dashboard;
