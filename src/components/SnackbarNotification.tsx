import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarNotificationProps } from '../types';

const SnackbarNotification: React.FC<SnackbarNotificationProps> = ({
  snackbarOpen,
  snackbarMessage,
  onClose,
  severity = 'info',
}) => {
  return (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal:'right'}}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
