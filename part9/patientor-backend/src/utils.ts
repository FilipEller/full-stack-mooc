import {
  Date,
  Gender,
  NewPatient,
  NewPatientFields,
  Entry,
  EntryType,
} from './types';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (value: any): value is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(value);
};

const isEntryArray = (value: unknown): value is Entry[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (
    value.some((v) => typeof v !== 'object' || !v.type || !isEntryType(v.type))
  ) {
    return false;
  }

  return true;
};

const isDate = (value: string): value is Date => {
  return Boolean(Date.parse(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value: any): value is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(value);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${Gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatient;
};
