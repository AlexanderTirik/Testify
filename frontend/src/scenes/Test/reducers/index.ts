import { Routine } from 'redux-saga-routines';
import { IQuestion } from '../../../common/models/question/IQuestion';
import { ITest } from '../../../common/models/test/ITest';
import { fetchTestRoutine } from '../routines';

export type ITestState = {
  isLoading: boolean;
  test?: ITest;
  questions: IQuestion[];
}

const initialState = {
  test: undefined,
  questions: [],
  isLoading: false
};

const test = (state: ITestState = initialState, action: Routine<any>): ITestState => {
  switch (action.type) {
    case fetchTestRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchTestRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        test: action.payload
      };
    case fetchTestRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default test;
