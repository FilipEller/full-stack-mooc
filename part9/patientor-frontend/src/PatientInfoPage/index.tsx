import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import axios from 'axios';
import { Patient, Entry, EntryType } from '../types';

import { Typography } from '@material-ui/core';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = () => {
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const iconStyles = { color: '#000000', fontSize: 60 };

  React.useEffect(() => {
    if (id) {
      setPatient(patients[id]);
      const fetchPatientInfo = async () => {
        console.log('fetching data');
        try {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(data);
          dispatch(updatePatient(data));
          setPatient(data);
        } catch (e) {
          console.error(e);
        }
      };
      if (!patient || (patient && !patient.ssn)) {
        void fetchPatientInfo();
      }
    }
  }, [dispatch]);

  if (!id) {
    return <div>Something went wrong.</div>;
  }
  if (!patient) {
    return <div>No patient with id {id}.</div>;
  }

  const entryData = (entry: Entry) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (entry.type) {
      case EntryType.Hospital:
        return <></>;
      case EntryType.OccupationalHealthcare:
        return <></>;
      case EntryType.HealthCheck:
        return <></>;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h3">
        {patient.name}
        {
          {
            male: <MaleIcon sx={iconStyles} />,
            female: <FemaleIcon sx={iconStyles} />,
            other: <TransgenderIcon sx={iconStyles} />,
          }[patient.gender]
        }
      </Typography>
      <p>
        ssh: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <Typography align="center" variant="h4">
        Entries
      </Typography>
      <div>
        {patient.entries?.map((entry) => (
          <div key={entry.id}>
            {entry.date} – {entry.specialist}
            <br />
            <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
            {entryData(entry)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientInfoPage;
