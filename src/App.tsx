import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import ClassCard from './components/ClassCard';
import useGetStudent from './hooks/useGetStudent';
import IStudentsFieldSet from './interface/IStudentFieldSet';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const [{ data, loading, error }, startAgain, getStudents] = useGetStudent();

  const login = () => {
    getStudents(searchTerm);
  };

  const clearStudent = () => {
    setSearchTerm('');
    startAgain();
  };

  return (
    <div className="App">
      {/* Error while fetching */}
      {error && (
        <div>
          An error occured:
          {' '}
          {error}
        </div>
      )}
      {/* Loading */}
      {loading && (<p><b>Loading</b></p>)}
      {
        data.length === 0 && !loading && !error && (
          <div>
            <input type="text" data-cy="search-input" value={searchTerm} onChange={({ target: { value } }) => setSearchTerm(value)} />
            <button type="submit" data-cy="login-button" onClick={() => login()}>login</button>
          </div>
        )
      }

      {/* Data available */}
      {
        data.map(
          (classDetails: IStudentsFieldSet) => (
            <ClassCard
              key={nanoid()}
              classDetails={classDetails}
            />
          ),
        )
      }
      {/* Clear data button */}
      {data.length > 0 && !loading && <button type="submit" onClick={() => clearStudent()}>logout</button>}
    </div>
  );
}

export default App;
