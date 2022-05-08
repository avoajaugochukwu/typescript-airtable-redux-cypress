import { IClassRecord } from '../interface/IClass';
import { IStudentRecord } from '../interface/IStudent';

export const addStudentNameArray = (
  studentRecord:IStudentRecord,
  students:IStudentRecord[],
): IStudentRecord => {
  const myClass = studentRecord;
  myClass.studentName = [];

  // eslint-disable-next-line consistent-return
  students.forEach((student:any) => {
    if (studentRecord?.Students?.includes(student.id)) {
      return myClass?.studentName?.push(student.field.Name);
    }
  });

  return myClass;
};

export const getDataForDisplay = (
  students:IStudentRecord[],
  classes:IClassRecord[],
): IStudentRecord[] => {
  const a = classes.map((cla:any) => addStudentNameArray(cla, students));
  return a;
};
