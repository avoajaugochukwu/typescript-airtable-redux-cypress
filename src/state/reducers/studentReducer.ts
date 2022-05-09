/* eslint-disable @typescript-eslint/default-param-last */
import { IStudentState } from '../../interface/IStudent';
import ActionType from '../action-types/index';
import { Action } from '../actions';

const initialState: IStudentState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state: IStudentState = initialState, action: Action): IStudentState => {
  switch (action.type) {
    case ActionType.GET_STUDENTS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case ActionType.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ActionType.GET_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.CLEAR_STUDENTS:
      return {
        ...state,
        data: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
