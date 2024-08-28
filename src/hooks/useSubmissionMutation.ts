import { useMutation } from 'react-query';
import { SubmissionData } from '../types';
import { mockSubmitApi } from '../api/mockSubmitApi';
import { useState } from 'react';
import useFormStore from '../store/useFormStore';

export const useSubmissionMutation = (
  maxRetries: number,
  onSuccessCallback: (data: SubmissionData) => void
) => {
  const { addSubmission } = useFormStore();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<React.ReactNode>('No changes');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [retryCancelToken, setRetryCancelToken] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isFinalError, setIsFinalError] = useState(false); // Track if all retries failed

  const mutation = useMutation<SubmissionData, Error, SubmissionData>(
    async (data: SubmissionData) => {
      return mockSubmitApi(data);
    },
    {
      onMutate: () => {
        setRetryCancelToken(null); // Reset the retry token at the start of each mutation
        setStatus('submitting');
        setStatusMessage('Submitting...');
        setIsFinalError(false); // Reset final error flag on new submission
      },
      onSuccess: (data) => {
        addSubmission(data);
        setStatus('success');
        setStatusMessage('Success! Data saved.');
        setSnackbarMessage('Data saved successfully');
        setSnackbarOpen(true);
        setRetryCancelToken(null); // Clear the retry token on success
        onSuccessCallback(data); // Trigger the callback and pass the data to it
      },
      onError: (error) => {
        setStatus('error');
        setStatusMessage(`Error: failed to save - ${error.message}`);
        setIsFinalError(true); // Mark as final error after all retries
      },
      onSettled: () => {
        setStatus('idle');
        setStatusMessage('No changes');
      },
      retry: (failureCount, error) => {
        if (failureCount < maxRetries) {
          setSnackbarMessage(`Retry attempt ${failureCount + 1} for error: ${error.message}`);
          setSnackbarOpen(true);
          return retryCancelToken === null; // Retry if no cancel token is set
        }
        return false; // Do not retry if maxRetries is reached
      },
    }
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    // Buggy, should use an abort controller to cancel the retry but it's not implemented in the mock API
    // setRetryCancelToken(Date.now()); // Set a cancel token to stop retrying
  };

  return {
    mutation,
    status,
    statusMessage,
    setStatusMessage,
    snackbarMessage,
    snackbarOpen,
    handleCloseSnackbar,
    isFinalError,
  };
};
