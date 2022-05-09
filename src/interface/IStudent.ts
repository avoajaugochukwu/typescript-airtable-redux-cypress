import { FieldSet } from 'airtable';

export interface IStudentState {
  data: IStudent[];
  loading: boolean;
  error: null | string;
}

export interface IStudent {
  id: string;
  field: FieldSet;
  Name?: string;
  Students?: string[];
  studentName?: string[];
}

export interface IStudentClass {
  field: {
    Name: string,
    Classes: string[]
  };
  id: string;
}
