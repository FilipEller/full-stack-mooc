import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

let patients = patientData;

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
  patients = patients.concat(patient);
  return patient;
};

const addEntry = (
  patientId: string,
  newEntry: NewEntry
): Patient | undefined => {
  const patient = findPatient(patientId);
  const entry = { id: uuid(), ...newEntry };
  if (patient) {
    patients = patients.map((p) =>
      p.id === patientId ? { ...p, entries: [...p.entries, entry] } : p
    );
  }
  return patient;
};

export default {
  getPatients,
  findPatient,
  getPublicPatients,
  addPatient,
  addEntry,
};
