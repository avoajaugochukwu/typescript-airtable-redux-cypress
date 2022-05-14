/* eslint-disable consistent-return */
import { FieldSet } from 'airtable';
import { Records } from 'airtable/lib/records';
import getAirtableBase from './getAirtable';

export {};

const getStudentClassList = async (
  studentName: string,
): Promise<Records<FieldSet>> => {
  const base = getAirtableBase();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    base('Students')
      .select({
        filterByFormula: `({Name} = '${studentName}')`,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        try {
          fetchNextPage();

          if (records.length === 0) {
            reject(new Error('Cannot find this student name'));
          }

          resolve(records);
        } catch (error: any) {
          reject(new Error('Cannot find this student name'));
        }
      });
  });
};

const getList = async (table: string, field: string, value: string) => {
  const base = getAirtableBase();

  return new Promise((resolve, reject) => {
    base(table)
      .select({
        filterByFormula: `({${field}} = '${value}')`,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        try {
          fetchNextPage();

          if (records.length === 0) {
            reject(new Error('Cannot find this student name'));
          }

          resolve(records);
        } catch (error: any) {
          reject(new Error('Cannot find this student name'));
          // throw new Error('Cannot find this student name');
          // reject(new Error('Cannot find this student name'));
        }
      });
  });
};

export default { getStudentClassList, getList };
