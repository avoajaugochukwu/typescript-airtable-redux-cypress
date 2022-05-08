import React, { useState } from 'react';
import './App.css';
import ClassCard from './components/ClassCard';
import useGetStudent from './hooks/useGetStudent';
import { IStudentRecord } from './interface/IStudent';
// export const ADD_BOOKING = 'APP/BOOK_TABLE/ADD_BOOKING';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [{ data = [], loading = false, error = null }, getStudents] = useGetStudent();

  const login = async () => {
    getStudents(searchTerm);
  };

  return (
    <div className="App">
      {error && (
        <div>
          An error occured
          {' '}
          {error}
        </div>
      )}
      {loading && (<p><b>Loading</b></p>)}
      {
        data.length === 0 && !loading && (
          <div>
            <input type="text" value={searchTerm} onChange={({ target: { value } }) => setSearchTerm(value)} />
            <button type="submit" onClick={login}>login</button>
          </div>
        )
      }

      {
        data.map(
          (classDetails: IStudentRecord) => (
            <ClassCard
              key={classDetails.Name}
              classDetails={classDetails}
            />
          ),
        )
      }
    </div>
  );
}

export default App;
