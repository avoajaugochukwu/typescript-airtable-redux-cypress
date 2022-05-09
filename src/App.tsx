import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import './App.css';
import ClassCard from './components/ClassCard';
import useGetStudent from './hooks/useGetStudent';
import { IStudentRecord } from './interface/IStudent';
import { RootState } from './state/reducers';

function App() {
  const { data, loading, error } = useSelector((state: RootState) => state.students);
  const [searchTerm, setSearchTerm] = useState('');

  const [startAgain, getStudents] = useGetStudent();

  const login = async () => {
    getStudents(searchTerm);
  };

  const clearStudent = () => {
    setSearchTerm('');
    startAgain();
  };

  return (
    <div className="App">
      {error && (
        <div>
          An error occured:
          {' '}
          {error}
        </div>
      )}
      {loading && (<p><b>Loading</b></p>)}
      {
        data.length === 0 && !loading && !error && (
          <div>
            <input type="text" data-cy="search-input" value={searchTerm} onChange={({ target: { value } }) => setSearchTerm(value)} />
            <button type="submit" data-cy="login-button" onClick={login}>login</button>
          </div>
        )
      }

      {
        data.map(
          (classDetails: IStudentRecord) => (
            <ClassCard
              key={nanoid()}
              classDetails={classDetails}
            />
          ),
        )
      }

      {data.length > 0 && !loading && <button type="submit" onClick={() => clearStudent()}>logout</button>}
    </div>
  );
}

export default App;
