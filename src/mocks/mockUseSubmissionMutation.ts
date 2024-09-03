import { jest } from '@jest/globals';
import { SubmissionData } from '../types';

export const mockUseSubmissionMutation = () => {
  const mutation = {
    mutate: jest.fn((data, { onSuccess, onSettled }) => {
      // Simulate an asynchronous operation that resolves immediately
      setTimeout(() => {
        onSuccess?.("Hello");
        onSettled?.();
      }, 0);
    }),
    status: 'idle' as 'idle' | 'submitting' | 'success' | 'error',
    data: "Hello" as unknown as SubmissionData | null,
    error: null as Error | null,
    isLoading: false,
    isSuccess: true,
    isError: false,
    reset: jest.fn(),
  };

  const status = mutation.status;
  const statusMessage = 'No changes';
  const setStatusMessage = jest.fn();
  const snackbarMessage = 'Data saved successfully';
  const snackbarOpen = false;
  const handleCloseSnackbar = jest.fn();
  const isFinalError = false;

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
