export interface FormState {
  changes: number;
  errors: number;
  submittedData: SubmissionData[];
  setChanges: (changes: number) => void;
  setErrors: (errors: number) => void;
  addSubmission: (data: Omit<SubmissionData, 'id'>) => void;
  resetSubmissions: () => void;
}

export interface SubmissionData {
  id: string;
  fieldName: string;
  description: string;
}

export interface SubmissionTableProps {
  submissions: SubmissionData[];
  isLoading?: boolean;
}

export interface FormSubmitComponentProps {
  changes: number;
  errors: { message: string }[];
  onSubmit: () => void;
  onReset: () => void;
  status: 'idle' | 'submitting' | 'success' | 'error';
  statusMessage: string;
  isFinalError: boolean;
}

export interface FormProps {
  initialValues: SubmissionData;
  changes: number;
  errors: { message: string }[];
  status: 'idle' | 'submitting' | 'success' | 'error';
  statusMessage: string;
  snackbarOpen: boolean;
  snackbarMessage: string;
  submissions: SubmissionData[];
  isLoading: boolean;
  onFormSubmit: (data: SubmissionData) => void;
  onFormReset: () => void;
  onStatusChange: (message: string) => void;
  onChangesChange: (count: number) => void;
  onErrorsChange: (errors: { message: string }[]) => void;
  onSnackbarClose: () => void;
  isFinalError: boolean;
}

export interface SnackbarNotificationProps {
  snackbarOpen: boolean;
  snackbarMessage: string;
  onClose: () => void;
  severity?: 'success' | 'error' | 'warning' | 'info';
}