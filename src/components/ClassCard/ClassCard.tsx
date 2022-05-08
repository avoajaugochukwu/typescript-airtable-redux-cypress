import React, { FC } from 'react';
import { IStudentRecord } from '../../interface/IStudent';
import './classcard.css';

type Props = {
  classDetails: IStudentRecord
};

const ClassCard: FC<Props> = ({ classDetails }) => (
  <div>
    <div className="card-box">
      <div>
        <p><b>Name</b></p>
        <p>{classDetails.Name}</p>
      </div>
      <div>
        <p><b>Students</b></p>
        <p>{classDetails?.studentName?.map((name) => <span>{`${name}, `}</span>)}</p>
      </div>
    </div>
  </div>
);

export default ClassCard;
