/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Airtable, { FieldSet } from 'airtable';
import { IStudentRecord, IStudentState } from '../interface/IStudent';
import getTitleCase from '../utils/getTitleCase';
import { getDataForDisplay } from '../utils/getDataForDisplay';
import { IClassRecord } from '../interface/IClass';

const useGetStudent = (): [IStudentState, (studentName: string) => void] => {
  const base = new Airtable({ apiKey: 'keyVTPdHrkEbqTyGZ' }).base('app8ZbcPx7dkpOnP0');

  const fetchInitialState = {
    data: [],
    loading: false,
    error: null,
  };

  const [result, setResult] = useState<IStudentState>(fetchInitialState);
  const [studentRecord, setStudentRecord] = useState<Partial<IStudentRecord[]>>([]);
  const [classRecord, setClassRecord] = useState<IClassRecord[]>([]);

  const getError = (error: any) => {
    setResult((prevState) => ({ ...prevState, loading: false, error }));
  };

  const fetchStudentNames = (arrId: any) => {
    base('Students').select({
      filterByFormula: `OR(${arrId.map((id: string) => `RECORD_ID()='${id}'`).join(',')})`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      const studentRecords = records.map((record) => ({ id: record.id, field: record.fields }));

      setStudentRecord(studentRecords);

      fetchNextPage();
    }, (err) => {
      if (err) { getError(err); }
    });
  };

  const fetchClassNames = (arr: string[]) => {
    base('Classes').select({
      filterByFormula: `OR(${arr.map((id: string) => `RECORD_ID()='${id}'`).join(',')})`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      const flatStudentList = records.map((record) => record.fields.Students).flat();

      fetchStudentNames(flatStudentList);

      const classRec = records.map(
        (record) => ({ Name: record.fields.Name, Students: record.fields.Students }),
      );

      setClassRecord(classRec as IClassRecord[]);

      fetchNextPage();
    }, (err) => {
      if (err) { getError(err); }
    });
  };

  const fetchStudentClasses = (studentName: string) => {
    base('Students').select({
      filterByFormula: `({Name} = '${studentName}')`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      const [classesRecordId] = records.map((record) => record.fields.Classes);

      fetchClassNames(classesRecordId as string[]);

      fetchNextPage();
    }, (err) => {
      if (err) { getError(err); }
    });
  };

  const getStudents = (studentName: string) => {
    setResult((prevState) => ({ ...prevState, loading: true }));

    if (!studentName) {
      setResult((prevState) => ({ ...prevState, loading: false }));
    }

    if (studentName) {
      const studentNameTitle = getTitleCase(studentName);
      fetchStudentClasses(studentNameTitle);
    }
  };

  useEffect(() => {
    if (studentRecord.length && studentRecord !== undefined && classRecord.length) {
      const b: IStudentRecord[] = studentRecord as IStudentRecord[];
      const a = getDataForDisplay(b, classRecord);
      setResult((prevState) => ({ ...prevState, loading: false, data: a }));
    }
  }, [studentRecord, classRecord]);

  return [result, getStudents];
};

export default useGetStudent;
