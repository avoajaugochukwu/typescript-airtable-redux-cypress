import IStudentsFieldSet from './IStudentFieldSet';

export interface IStudentState {
  data: IStudentsFieldSet[];
  loading: boolean;
  error: null | string;
}
