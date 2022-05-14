import { FieldSet } from 'airtable';

interface IStudentsFieldSet extends FieldSet {
  id: string;
  Name: string;
  Students: string[];
  studentName: string[];
}

export default IStudentsFieldSet;
