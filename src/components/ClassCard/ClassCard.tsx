import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { IStudent } from '../../interface/IStudent';
import './classcard.css';

type Props = {
  classDetails: IStudent
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
        <p>{classDetails?.studentName?.map((name) => <span key={nanoid()}>{`${name}, `}</span>)}</p>
      </div>
    </div>
  </div>
);

export default ClassCard;
