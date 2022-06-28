import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import { Box } from '@material-ui/core';

const entryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const typeSpecificDetails = () => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box sx={{ m: 1, p: 2, border: '2px solid #ccc', borderRadius: 5 }}>
      {entry.date} – {entry.specialist}
      <br />
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} – {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
      </ul>
      {typeSpecificDetails()}
    </Box>
  );
};

export default entryDetails;
