import { IClassRecord } from '../interface/IClass';
import IClassFieldSet from '../interface/IClassFieldSet';
import { IStudent } from '../interface/IStudent';
import IStudentsFieldSet from '../interface/IStudentFieldSet';

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

export const addStudentNameArrayNew = (
  classRecord: IStudentsFieldSet,
  students: IClassFieldSet[],
) => {
  const myClass = classRecord;
  myClass.studentName = [];

  // eslint-disable-next-line consistent-return
  students.forEach((student: IClassFieldSet) => {
    if (student.id && classRecord.Students.includes(student.id)) {
      return myClass.studentName.push(student.Name || '');
    }
  });

  return myClass;
};

export const getDataForDisplayNew = (
  classDetails: IStudentsFieldSet[],
  studentDetails: IClassFieldSet[],
): IStudentsFieldSet[] => {
  const data = classDetails.map(
    (classDetail: IStudentsFieldSet) => addStudentNameArrayNew(classDetail, studentDetails),
  );
  return data;
};
