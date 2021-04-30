import { Routine } from 'redux-saga-routines';
import { IStudentQuestion } from '../../../common/models/question/IStudentQuestion';
import { ITest } from '../../../common/models/test/ITest';
import { fetchStudentQuestionsRoutine, fetchTestRoutine } from '../routines';

export type ITestState = {
  isLoading: boolean;
  test?: ITest;
  questions: IStudentQuestion[];
}

const initialState = {
  test: undefined,
  questions: [],
  isLoading: false
};

const test = (state: ITestState = initialState, action: Routine<any>): ITestState => {
  switch (action.type) {
    case fetchStudentQuestionsRoutine.TRIGGER:
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
    case fetchStudentQuestionsRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload
      };
    case fetchStudentQuestionsRoutine.FAILURE:
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
