import React from 'react';

const Notification = ({ message, success }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`notification ${success ? 'success' : 'danger'}`}>
      {message}
    </div>
  );
};

export default Notification;
