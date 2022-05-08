import { FieldSet } from 'airtable';
// import { IClassCard } from './IClass';

export interface IStudentState {
  data: IStudentRecord[];
  loading: boolean;
  error: null | string;
}

export interface IStudentRecord {
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
