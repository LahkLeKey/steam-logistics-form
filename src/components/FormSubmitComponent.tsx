import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  DialogContentText,
  Grid,
  IconButton,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { FormSubmitComponentProps } from '../types';

const FormSubmitComponent: React.FC<FormSubmitComponentProps> = ({
  changes,
  errors,
  onSubmit,
  onReset,
  status,
  statusMessage,
  isFinalError,
}) => {
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [networkErrorDialogOpen, setNetworkErrorDialogOpen] = useState(false);

  const isResetDisabled = useMemo(() => changes === 0 || status === 'submitting', [changes, status]);

  const handleOpenErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleOpenNetworkErrorDialog = () => {
    setNetworkErrorDialogOpen(true);
  };

  const handleCloseNetworkErrorDialog = () => {
    setNetworkErrorDialogOpen(false);
  };

  return (
    <Box>
      <Grid container alignItems="center" spacing={2} mb={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={errors.length > 0 || changes === 0 || status === 'submitting'}
            startIcon={status === 'submitting' ? <CircularProgress size={20} /> : null}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={onReset} disabled={isResetDisabled}>
            Reset
          </Button>
        </Grid>
        {errors.length > 0 && (
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleOpenErrorDialog}>
              {`View ${errors.length} Error(s)`}
            </Button>
          </Grid>
        )}
        {isFinalError && (
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleOpenNetworkErrorDialog}>
              View Network Errors
            </Button>
          </Grid>
        )}
        <Grid item>
          {status === 'error' ? (
            <IconButton onClick={handleOpenErrorDialog} color="error">
              <ErrorIcon />
              <Typography variant="body2" color="error" style={{ marginLeft: 8 }}>
                {statusMessage}
              </Typography>
            </IconButton>
          ) : (
            <Typography variant="body2" color="textSecondary">
              {statusMessage}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog} aria-labelledby="error-dialog-title">
        <DialogTitle id="error-dialog-title">Submission Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There was an error during submission. Please review the details below:
          </DialogContentText>
          <Stack spacing={2} mt={2}>
            {errors.length > 0 ? (
              errors.map((error, index) => (
                <Alert key={index} severity="error">
                  {error.message}
                </Alert>
              ))
            ) : (
              <Alert severity="error">
                {statusMessage || "An unknown error occurred."}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={networkErrorDialogOpen}
        onClose={handleCloseNetworkErrorDialog}
        aria-labelledby="network-error-dialog-title"
      >
        <DialogTitle id="network-error-dialog-title">Network Errors</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The submission failed after multiple attempts. Please check the network connection or try again later.
          </DialogContentText>
          <Alert severity="error">
            {statusMessage || "Network error occurred."}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNetworkErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormSubmitComponent;
