import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import axios from 'axios';
import { Patient } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryForm from '../components/AddEntryForm';

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
  }, [dispatch, patients]);

  if (!id) {
    return <div>Something went wrong.</div>;
  }
  if (!patient) {
    return <div>No patient with id {id}.</div>;
  }

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
      <div>
        <Typography align="center" variant="h4">
          {patient.entries?.length ? 'Entries' : 'No entries'}
        </Typography>
        {patient.entries?.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      </div>
      <div>
        <AddEntryForm patient={patient} setPatient={setPatient} />
      </div>
    </div>
  );
};

export default PatientInfoPage;
