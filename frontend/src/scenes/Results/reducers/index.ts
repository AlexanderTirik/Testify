import { Routine } from 'redux-saga-routines';
import { IResult } from '../../../common/models/results/IResult';
import { fetchResultsRoutine } from '../routines';

export type IResultsState = {
  isLoading: boolean;
  results: IResult[];
}

const initialState = {
  isLoading: false,
  results: []
};

const results = (state: IResultsState = initialState, action: Routine<any>): IResultsState => {
  switch (action.type) {
    case fetchResultsRoutine.TRIGGER:
      return {
        ...state,
        isLoading: true
      };
    case fetchResultsRoutine.SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.payload
      };
    case fetchResultsRoutine.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default results;
