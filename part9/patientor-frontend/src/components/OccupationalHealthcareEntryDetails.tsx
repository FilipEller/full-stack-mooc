import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <WorkIcon sx={{ color: '#000000' }} />{' '}
      <i>{entry.employerName}</i>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
