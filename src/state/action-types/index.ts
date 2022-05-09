enum ActionType {
  GET_STUDENTS_REQUESTED = 'APP/STUDENTS/GET_STUDENTS_REQUESTED',
  GET_STUDENTS_SUCCESS = 'APP/STUDENTS/GET_STUDENTS_SUCCESS',
  GET_STUDENTS_FAILED = 'APP/STUDENTS/GET_STUDENTS_FAILED',
  CLEAR_STUDENTS = 'APP/STUDENTS/CLEAR_STUDENTS',
}

export default ActionType;
// async function getRecordsFromAirtable() {
//   let recordsArray = [];

//   await base('Users').select({
//     maxRecords: 3,
//     view: 'Grid view',
//   }).eachPage((records, fetchNextPage) => {
//     recordsArray = [...recordsArray, ...records];
//     fetchNextPage();
//   })
//     .catch((error) => { console.error(error); return false; });

//   return recordsArray;
// }
