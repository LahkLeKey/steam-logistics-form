import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Form from './components/Form';
import { useSubmissionMutation } from './hooks/useSubmissionMutation';
import { validateForm } from './validation/formValidation';
import { SubmissionData } from './types';
import { v4 as uuidv4 } from 'uuid';

export const steamLogicsticsLabel = 'Steam Logistics Form Submit Component';

const App: React.FC = () => {
  const [changes, setChanges] = useState(0);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [statusMessage, setStatusMessage] = useState('No changes');
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [formValues, setFormValues] = useState<SubmissionData>({ id: '', fieldName: '' });
  const MAX_RETRY = 3;

  const handleFormReset = () => {
    setFormValues({ id: '', fieldName: '' });
    setChanges(0);
    setErrors([]);
    setStatusMessage('No changes');
  };

  const handleSuccess = (data: SubmissionData) => {
    setSubmissions((prev) => [...prev, data]);
    handleFormReset();
  };

  const {
    mutation,
    status,
    snackbarMessage,
    snackbarOpen,
    handleCloseSnackbar,
    isFinalError,
  } = useSubmissionMutation(MAX_RETRY, handleSuccess);

  const handleFormSubmit = (data: SubmissionData) => {
    const validationErrors = validateForm(data);

    if (validationErrors.length > 0) {
      setErrors(validationErrors.map((error) => ({ message: error.message })));
    } else {
      setErrors([]);
      data.id = uuidv4();
      mutation.mutate(data);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {steamLogicsticsLabel}
      </Typography>
      <Form
        initialValues={formValues}
        changes={changes}
        errors={errors}
        status={status}
        statusMessage={statusMessage}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        submissions={submissions}
        isLoading={mutation.isLoading}
        onFormSubmit={handleFormSubmit}
        onFormReset={handleFormReset}
        onStatusChange={setStatusMessage}
        onChangesChange={setChanges}
        onErrorsChange={setErrors}
        onSnackbarClose={handleCloseSnackbar}
        isFinalError={isFinalError}
      />
    </Container>
  );
};

export default App;
