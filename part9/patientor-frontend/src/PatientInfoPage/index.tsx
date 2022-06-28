import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import axios from 'axios';
import { Patient } from '../types';

import { Typography } from '@material-ui/core';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (id) {
      const patient = patients[id];
      console.log('patient', patient);
      const fetchPatientInfo = async () => {
        try {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: 'UPDATE_PATIENT', payload: data });
        } catch (e) {
          console.error(e);
        }
      };
      if (!patient || (patient && !patient.ssn)) {
        void fetchPatientInfo();
      }
    }
  }, [dispatch, id]);

  if (!id) {
    return <div>Something went wrong.</div>;
  }

  const patient = patients[id];

  if (!patient) {
    return <div>No patient with id {id}.</div>;
  }

  console.log(patient);

  const iconStyles = { color: '#000000', fontSize: 60 };

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
      <p>
        {patient.entries?.map((p) => (
          <>{p}<br /></>
        ))}
      </p>
    </div>
  );
};

export default PatientInfoPage;
