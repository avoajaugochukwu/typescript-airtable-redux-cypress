interface IStudentRecord {
  _table: Table;
  id: string;
  _rawJson: RawJson;
  fields: Fields;
}

interface RawJson {
  id: string;
  createdTime: string;
  fields: Fields;
}

interface Fields {
  Name: string;
  Classes: string[];
}

interface Table {
  _base: Base;
  id?: any;
  name: string;
}

interface Base {
  _airtable: Airtable;
  _id: string;
}

interface Airtable {
}

export default IStudentRecord;
