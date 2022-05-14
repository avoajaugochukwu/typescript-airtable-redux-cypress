import IClassFieldSet from '../interface/IClassFieldSet';
import IStudentsFieldSet from '../interface/IStudentFieldSet';

export const addStudentNameArray = (
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

export const getDataForDisplay = (
  classDetails: IStudentsFieldSet[],
  studentDetails: IClassFieldSet[],
): IStudentsFieldSet[] => {
  const data = classDetails.map(
    (classDetail: IStudentsFieldSet) => addStudentNameArray(classDetail, studentDetails),
  );
  return data;
};
