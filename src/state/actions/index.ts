import IStudentsFieldSet from '../../interface/IStudentFieldSet';
import ActionType from '../action-types/index';

interface GetStudentRequestedAction {
  type: ActionType.GET_STUDENTS_REQUESTED,
}
interface GetStudentSuccessAction {
  type: ActionType.GET_STUDENTS_SUCCESS,
  payload: IStudentsFieldSet[]
}

interface GetStudentFailedAction {
  type: ActionType.GET_STUDENTS_FAILED,
  payload: string
}

interface ClearStudents {
  type: ActionType.CLEAR_STUDENTS
}

export type Action =
| GetStudentSuccessAction
| GetStudentRequestedAction
| GetStudentFailedAction
| ClearStudents;
