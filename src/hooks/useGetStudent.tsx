import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { RootState } from '../state/reducers';

import getTitleCase from '../utils/getTitleCase';
import miniExtAirtableUtils from '../utils/airtable.utils';
import { getDataForDisplay } from '../utils/getDataForDisplay';

import IClassFieldSet from '../interface/IClassFieldSet';
import IStudentsFieldSet from '../interface/IStudentFieldSet';
import { IStudentState } from '../interface/IStudent';

const useGetStudent = (): [IStudentState, () => void, (studentName: string) => void] => {
  const { data, loading, error } = useSelector((state: RootState) => state.students);

  const dispatch = useDispatch();

  const {
    setStudents, getStudentRequested, getStudentFailed, clearStudents,
  } = bindActionCreators(actionCreators, dispatch);

  const getStudents = async (studentName: string) => {
    getStudentRequested();

    if (!studentName) {
      clearStudents();
    }

    if (studentName) {
      const studentNameTitle = getTitleCase(studentName);

      try {
        const studentClassRecord: IClassFieldSet = await miniExtAirtableUtils
          .fetchRecordList('Students', 'Name', studentNameTitle);

        if (studentClassRecord.Classes) {
          const studentClassDetails: IStudentsFieldSet[] = await miniExtAirtableUtils
            .fetchClassById('Classes', studentClassRecord.Classes);

          const studentDetails: IClassFieldSet[] = await miniExtAirtableUtils
            .fetchStudentNameByClass(studentClassDetails);

          const classWithStudentName = await getDataForDisplay(studentClassDetails, studentDetails);

          setStudents(classWithStudentName);
        }
      } catch (err: any) {
        getStudentFailed(err);
      }
    }
  };

  const startAgain = () => {
    clearStudents();
  };

  return [{ data, loading, error }, startAgain, getStudents];
};

export default useGetStudent;
