import { Dispatch } from 'redux';
import { IStudentRecord } from '../../interface/IStudent';
import ActionType from '../action-types';
import { Action } from '../actions/index';

export const setStudents = (students: IStudentRecord[]) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.GET_STUDENTS_SUCCESS,
    payload: students,
  });
};

export const getStudentRequested = () => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.GET_STUDENTS_REQUESTED,
  });
};

export const getStudentFailed = (error: string) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.GET_STUDENTS_FAILED,
    payload: error,
  });
};

export const clearStudents = () => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.CLEAR_STUDENTS,
  });
};
