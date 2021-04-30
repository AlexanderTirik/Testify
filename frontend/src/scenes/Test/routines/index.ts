import { createRoutine } from 'redux-saga-routines';

export const fetchTestRoutine = createRoutine('FETCH_TEST');
export const fetchStudentQuestionsRoutine = createRoutine('FETCH_STUDENT_QUESTIONS');
export const sendAnswerRoutine = createRoutine('SEND_ANSWER');
