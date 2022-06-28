import React from 'react';
import { HealthCheckEntry } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const rating = entry.healthCheckRating;
  const iconColor = rating < 1 ? 'green' : rating > 2 ? 'red' : 'yellow';

  return (
    <div>
      Health: <FavoriteIcon sx={{ color: iconColor }} />
    </div>
  );
};

export default HealthCheckEntryDetails;
