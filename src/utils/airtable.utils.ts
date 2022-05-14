import { FieldSet } from 'airtable';
import IClassFieldSet from '../interface/IClassFieldSet';
import IStudentsFieldSet from '../interface/IStudentFieldSet';
import getAirtableBase from './getAirtable';

const fetchRecordList = async (
  table: string,
  field: string,
  value: string,
): Promise<FieldSet> => {
  const base = getAirtableBase();

  return new Promise((resolve, reject) => {
    base(table)
      .select({
        filterByFormula: `({${field}} = '${value}')`,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        try {
          if (records.length === 0) {
            reject(new Error('Cannot find this student name'));
          }

          resolve(records[0].fields);
          fetchNextPage();
        } catch (error: any) {
          reject(new Error('Cannot find this student name'));
        }
      });
  });
};

const fetchClassById = async (
  table: string,
  arr: string[],
): Promise<IStudentsFieldSet[]> => {
  const base = getAirtableBase();

  return new Promise((resolve, reject) => {
    base(table)
      .select({
        filterByFormula: `OR(${arr
          .map((id: string) => `RECORD_ID()='${id}'`)
          .join(',')})`,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        try {
          if (records.length === 0) {
            reject(new Error('Cannot fetch class details'));
          }

          const classRecord: IStudentsFieldSet[] = records.map(
            (record) => <IStudentsFieldSet>{
              id: record.id,
              Name: record.fields.Name,
              Students: record.fields.Students,
            },
          );

          resolve(classRecord);
          fetchNextPage();
        } catch (error: any) {
          reject(new Error('Cannot fetch class details'));
        }
      });
  });
};

const fetchStudentNameByClass = async (
  classRecord: IStudentsFieldSet[],
): Promise<IClassFieldSet[]> => {
  const base = getAirtableBase();

  const allStudentId: string[] = classRecord.map((c) => c.Students).flat();

  return new Promise((resolve, reject) => {
    base('Students')
      .select({
        filterByFormula: `OR(${allStudentId
          .map((id: string) => `RECORD_ID()='${id}'`)
          .join(',')})`,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        try {
          if (records.length === 0) {
            reject(new Error('Cannot find class mates names'));
          }

          const studentRecords: IClassFieldSet[] = records.map(
            (record) => <IClassFieldSet>{
              id: record.id,
              Name: record.fields.Name,
              Classes: record.fields.Classes,
            },
          );

          resolve(studentRecords);
        } catch (error: any) {
          reject(new Error('Cannot find class mates names'));
        }
        fetchNextPage();
      });
  });
};

export default { fetchRecordList, fetchClassById, fetchStudentNameByClass };
