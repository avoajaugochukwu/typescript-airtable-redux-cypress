/* eslint-disable consistent-return */
import { FieldSet } from 'airtable';
import { Records } from 'airtable/lib/records';
import getAirtableBase from './getAirtable';

export {};

const getStudentClassList = async (studentName: string): Promise<Records<FieldSet>> => {
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
          resolve(records);
        } catch (error: any) {
          throw new Error('Cannot find this student name');
          // reject(new Error('Cannot find this student name'));
        }
      });
  });
};

export default { getStudentClassList };
