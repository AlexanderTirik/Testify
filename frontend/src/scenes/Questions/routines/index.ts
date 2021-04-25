import { createRoutine } from 'redux-saga-routines';

export const fetchQuestionsRoutine = createRoutine('FETCH_QUESTIONS');
export const createQuestionRoutine = createRoutine('CREATE_QUESTION');
export const deleteQuestionRoutine = createRoutine('DELETE_QUESTION');
