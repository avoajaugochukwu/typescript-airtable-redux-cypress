import { FieldSet } from 'airtable';

interface IClassFieldSet extends FieldSet {
  id?: string;
  Name?: string;
  Classes?: string[]
}

export default IClassFieldSet;
