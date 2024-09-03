import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import FormSubmitComponent from './FormSubmitComponent';
import SnackbarNotification from './SnackbarNotification';
import SubmissionTable from './SubmissionTable';
import { FormProps } from '../types';
import { validateForm } from '../validation/validateForm';

const Form: React.FC<FormProps> = ({
  initialValues,
  changes,
  errors,
  status,
  statusMessage,
  snackbarOpen,
  snackbarMessage,
  submissions,
  isLoading,
  onFormSubmit,
  onFormReset,
  onStatusChange,
  onChangesChange,
  onErrorsChange,
  onSnackbarClose,
  isFinalError,
}) => {
  const { control, handleSubmit, watch, setError, clearErrors, reset } = useForm({
    defaultValues: initialValues,
  });

  const formValues = watch();

  const handleFormReset = () => {
    onFormReset();
    reset({ fieldName: '', description: '' });
  };

  useEffect(() => {
    const validationErrors = validateForm(formValues);
    const changeCount = Object.keys(formValues).filter(
      (key) => formValues[key as keyof typeof formValues] !== initialValues[key as keyof typeof initialValues]
    ).length;

    onChangesChange(changeCount);
    onErrorsChange(validationErrors);

    if (changeCount === 0) {
      onStatusChange('No changes');
      clearErrors();
    } else if (validationErrors.length > 0) {
      onStatusChange(`Validation errors: ${validationErrors.length}`);
      validationErrors.forEach((error) => {
        setError(error.path[0] as keyof typeof formValues, { type: 'manual', message: error.message });
      });
    } else {
      onStatusChange(`Unsubmitted changes: ${changeCount}`);
      clearErrors();
    }
  }, [formValues, initialValues, onChangesChange, onErrorsChange, onStatusChange, setError, clearErrors]);

  useEffect(() => {
    if (status === 'success' || (status === 'idle' && !isFinalError)) {
      reset({ fieldName: '', description: '' });
    }
  }, [status, isFinalError, reset]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          name="fieldName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Field Name"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Box mt={2}>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        </Box>
        <Box mt={2}>
          <FormSubmitComponent
            changes={changes}
            errors={errors}
            onSubmit={handleSubmit(onFormSubmit)}
            onReset={handleFormReset}
            status={status}
            statusMessage={statusMessage}
            isFinalError={isFinalError}
          />
        </Box>
      </form>

      <Box mt={4}>
        <SubmissionTable submissions={submissions} />
      </Box>

      <SnackbarNotification
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={onSnackbarClose}
        severity={status === 'idle' ? 'success' : 'error'}
      />
    </Box>
  );
};

export default Form;