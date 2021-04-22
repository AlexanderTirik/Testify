import { createRoutine } from 'redux-saga-routines';

export const fetchTestsRoutine = createRoutine('FETCH_TESTS');
export const createTestRoutine = createRoutine('CREATE_TEST');
export const deleteTestRoutine = createRoutine('DELETE_TEST');
