import React from 'react';

import { Button } from '@material-ui/core';
import {
  Field,
  Formik,
  Form,
  ErrorMessage, // eslint-disable-line
  FieldProps,
  FormikProps, // eslint-disable-line
} from 'formik';
import { Select, MenuItem, Typography, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import axios from 'axios';
import { updatePatient } from '../state';

interface FormValues {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  dischargeDate: string;
  criteria: string;
}

export const AddEntryForm = ({
  patient,
  setPatient,
}: {
  patient: Patient;
  setPatient: (patient: Patient) => void;
}) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string>();

  const FormikSelect = ({ field, ...props }: FieldProps) => (
    <Select {...field} {...props} />
  );

  const entryTypeOptions = [
    { value: 'Hospital', label: 'Hospital' },
    { value: 'HealthCheck', label: 'Health Check' },
    { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  ];

  const submitNewEntry = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const {
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        dischargeDate,
        criteria,
      } = values;
      const newEntry = {
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge: { date: dischargeDate, criteria },
      };
      console.log(diagnosisCodes);
      const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        newEntry
      );
      console.log(data);
      const newPatient = {
        ...patient,
        entries: patient.entries ? [...patient.entries, data] : [data],
      };
      dispatch(updatePatient(newPatient));
      setPatient(newPatient);
      resetForm();
      setError(undefined);
    } catch (e: unknown) {
      console.log('Oopsie, error.', e);
      if (axios.isAxiosError(e)) {
        console.error(
          'Axios error',
          e?.response?.data || 'Unrecognized axios error'
        );
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else if (e instanceof Error) {
        console.log('Non-axios error', e?.message);
        setError(e?.message);
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const initialValues: FormValues = {
    type: 'Hospital',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    dischargeDate: '',
    criteria: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitNewEntry}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'Hospital' && !values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (values.type === 'Hospital' && !values.criteria) {
          errors.criteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Typography align="center" variant="h4">
              Add an entry
            </Typography>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <InputLabel>Type</InputLabel>
            <Field
              fullWidth
              style={{ marginBottom: '0.5em' }}
              label="Type"
              component={FormikSelect}
              name="type"
            >
              {entryTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label || option.value}
                </MenuItem>
              ))}
            </Field>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
              selectedDiagnoses={values.diagnosisCodes}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="criteria"
              component={TextField}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
