import React from 'react';
import { HospitalEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <p>
      <LocalHospitalIcon sx={{ color: '#000000' }} />
      Discharged: {entry.discharge.date}
      <br />
      Criteria for discharge: {entry.discharge.criteria}
    </p>
  );
};

export default HospitalEntryDetails;
