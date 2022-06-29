import {
  Date,
  Gender,
  NewPatient,
  NewPatientFields,
  NewEntry,
  Diagnosis,
  NewEntryFields,
} from './types';

export const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

/*
interface ObjWithTypeProperty {
  type: string;
}


const isObjWithType = (value: unknown): value is ObjWithTypeProperty => {
  if (!(typeof value === 'object' || value instanceof Object)) {
    return false;
  }
  if (!value || !('type' in value)) {
    return false;
  }
  return true;
};

export const isEntry = (value: unknown): value is Entry => {
  return (
    isObjWithType(value) &&
    isString(value.type) &&
    ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(value.type)
  );
};

export const isEntryArray = (value: unknown): value is Entry[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.some((v) => !isEntry(v))) {
    return false;
  }

  return true;
};*/

export const isCodeArray = (
  value: unknown
): value is Array<Diagnosis['code']> => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.some((v) => !isString(v))) {
    return false;
  }

  return true;
};

export const isDate = (value: string): value is Date => {
  return Boolean(Date.parse(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (value: any): value is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(value);
};

const parseDate = (date: unknown): Date => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${Gender}`);
  }
  return gender;
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }
  return value;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes) {
    return [];
  }
  if (!isCodeArray(codes)) {
    throw new Error(`Incorrect diagnosis codes: ${codes}`);
  }
  return codes;
};

const parseRating = (value: unknown): number => {
  if (!value || !isNumber(value) || value < 0 || value > 3) {
    throw new Error(`Incorrect or missing health check rating: ${value}`);
  }
  return value;
};

const parseDischarge = ({
  date,
  criteria,
}: {
  date: unknown;
  criteria: unknown;
}) => {
  if (
    !date ||
    !criteria ||
    !isString(date) ||
    !isDate(date) ||
    !isString(criteria)
  ) {
    throw new Error(
      `Incorrect or missing discharge date or criteria: ${date}, ${criteria}`
    );
  }
  return { date, criteria };
};

const parseSickLeave = ({
  startDate,
  endDate,
}: {
  startDate: unknown;
  endDate: unknown;
}) => {
  if (!startDate && !endDate) {
    return {};
  }
  if (
    !startDate ||
    !endDate ||
    !isString(startDate) ||
    !isDate(startDate) ||
    !isString(endDate) ||
    !isDate(endDate)
  ) {
    throw new Error(
      `Incorrect or missing sick leave start or end date: ${startDate}, ${endDate}`
    );
  }
  return { startDate, endDate };
};

/*
const parseType = (value: unknown): string => {
  const type = parseString(value, 'type');
  if (!['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(type)) {
    throw new Error(`Incorrect type: ${type}`);
  }
  return type;
};
*/

/*
const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};
*/

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: [],
  };
  return newPatient;
};

export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave,
  healthCheckRating,
  discharge,
}: NewEntryFields): NewEntry => {
  console.log(
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave,
    healthCheckRating,
    discharge
  );

  const base = {
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(description, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  const typeSpecific = (type: string) => {
    switch (type) {
      case 'Hospital':
        return {
          type: 'Hospital',
          discharge: parseDischarge(discharge as any), // eslint-disable-line
        };
      case 'HealthCheck':
        return {
          type: 'HealthCheck',
          healthCheckRating: parseRating(healthCheckRating),
        };
      case 'OccupationalHealthcare':
        return {
          type: 'OccupationalHealthcare',
          employerName: parseString(employerName, 'employer name'),
          sickLeave: parseSickLeave(sickLeave as any), // eslint-disable-line
        };
      default:
        throw new Error(`Incorrect type: ${type}`);
    }
  };

  const newEntry = {
    ...base,
    ...typeSpecific(parseString(type, 'type')),
  };
  return newEntry as NewEntry;
};
