import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { IStudent } from '../interface/IStudent';
import getTitleCase from '../utils/getTitleCase';
import { getDataForDisplay } from '../utils/getDataForDisplay';
import { IClassRecord } from '../interface/IClass';
import getAirtableBase from '../utils/getAirtable';

// import miniExtAirtableUtils from '../utils/airtable.utils';

const useGetStudent = (): [() => void, (studentName: string) => void] => {
  const base = getAirtableBase();
  const dispatch = useDispatch();

  const {
    setStudents, getStudentRequested, getStudentFailed, clearStudents,
  } = bindActionCreators(actionCreators, dispatch);

  const [studentRecord, setStudentRecord] = useState<Partial<IStudent[]>>([]);
  const [classRecord, setClassRecord] = useState<IClassRecord[]>([]);

  const fetchStudentNames = (arrId: any) => {
    base('Students').select({
      filterByFormula: `OR(${arrId.map((id: string) => `RECORD_ID()='${id}'`).join(',')})`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      try {
        const studentRecords = records.map((record) => ({ id: record.id, field: record.fields }));

        setStudentRecord(studentRecords);
      } catch (error: any) {
        getStudentFailed('Cannot class mates names');
      }
      fetchNextPage();
    });
  };

  const fetchClassNames = (arr: string[]) => {
    base('Classes').select({
      filterByFormula: `OR(${arr.map((id: string) => `RECORD_ID()='${id}'`).join(',')})`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      try {
        const flatStudentList = records.map((record) => record.fields.Students).flat();

        fetchStudentNames(flatStudentList);

        const classRec = records.map(
          (record) => ({ Name: record.fields.Name, Students: record.fields.Students }),
        );

        setClassRecord(classRec as IClassRecord[]);
      } catch (error:any) {
        getStudentFailed('Cannot fetch class names');
      }
      fetchNextPage();
    });
  };

  const fetchStudentClasses = (studentName: string) => {
    base('Students').select({
      filterByFormula: `({Name} = '${studentName}')`,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      try {
        const [classesRecordId] = records.map((record) => record.fields.Classes);

        fetchClassNames(classesRecordId as string[]);
      } catch (error:any) {
        getStudentFailed('Cannot find this student name');
      }
      fetchNextPage();
    });
  };

  const getStudents = async (studentName: string) => {
    getStudentRequested();

    if (!studentName) {
      clearStudents();
    }

    if (studentName) {
      const studentNameTitle = getTitleCase(studentName);
      fetchStudentClasses(studentNameTitle);
      // try {
      //   miniExtAirtableUtils.getStudentClassList(studentNameTitle)
      //     .then((data) => { console.log(data, 'data'); })
      //     .catch((err) => console.log(err, 'err'));
      // } catch (e: any) {
      //   console.log(' I failed you');
      // }
    }
  };

  useEffect(() => {
    if (studentRecord.length && studentRecord !== undefined && classRecord.length) {
      const students: IStudent[] = studentRecord as IStudent[];
      const data = getDataForDisplay(students, classRecord);
      setStudents(data);
    }
  }, [studentRecord, classRecord]);

  const startAgain = () => {
    clearStudents();
  };

  return [startAgain, getStudents];
};

export default useGetStudent;
