import { IClassRecord } from '../interface/IClass';
import { IStudent } from '../interface/IStudent';

export const addStudentNameArray = (
  studentRecord:IStudent,
  students:IStudent[],
): IStudent => {
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
  students:IStudent[],
  classes:IClassRecord[],
): IStudent[] => {
  const data = classes.map((cla:any) => addStudentNameArray(cla, students));
  return data;
};
