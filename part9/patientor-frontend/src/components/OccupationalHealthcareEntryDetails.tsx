import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      {entry.sickLeave && (
        <p>
          Sick leave starting: {entry.sickLeave.startDate}
          <br/>
          Sick leave ending: {entry.sickLeave.endDate}
        </p>
      )}
      <WorkIcon sx={{ color: '#000000' }} /> <i>{entry.employerName}</i>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
