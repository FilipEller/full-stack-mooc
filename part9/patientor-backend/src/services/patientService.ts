import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const findPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  findPatient,
  getPublicPatients,
  addPatient,
};
