import { FieldSet } from 'airtable';

interface IStudentsFieldSet extends FieldSet {
  Name: string;
  Students: string[]
}

export default IStudentsFieldSet;
