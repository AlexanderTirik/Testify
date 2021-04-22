import { Routine } from 'redux-saga-routines';
import { IQuestion } from '../../../common/models/question/IQuestion';
import { createQuestionRoutine, fetchQuestionsRoutine, deleteQuestionRoutine } from '../routines';

export type IQuestionsState = {
  isLoading: boolean;
  questions: IQuestion[];
}

const initialState = {
  questions: [],
  isLoading: false
};

const questions = (state: IQuestionsState = initialState, action: Routine<any>): IQuestionsState => {
  switch (action.type) {
    case createQuestionRoutine.TRIGGER:
    case fetchQuestionsRoutine.TRIGGER:
    case deleteQuestionRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case createQuestionRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: [action.payload, ...state.questions]
      };
    case fetchQuestionsRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload
      };
    case deleteQuestionRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: state.questions.filter(q => q.id !== action.payload.questionId)
      };
    case createQuestionRoutine.FAILURE:
    case fetchQuestionsRoutine.FAILURE:
    case deleteQuestionRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default questions;
