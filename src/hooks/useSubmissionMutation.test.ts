import React from 'react';
import { renderHook } from '@testing-library/react';
import { mockUseSubmissionMutation } from '../mocks/mockUseSubmissionMutation';
import { MockAppWrapper } from '../testingUtils/mockAppWrapper';

jest.mock('./useSubmissionMutation', () => ({
  useSubmissionMutation: mockUseSubmissionMutation,
}));

test('useSubmissionMutation returns the correct initial state', async () => {
  const { result } = renderHook(() => mockUseSubmissionMutation(), { wrapper: MockAppWrapper });

  // Validate the initial state returned by the mock hook
  expect(result.current.status).toBe('idle');
  expect(result.current.mutation.data).toBe('Hello');
  expect(result.current.statusMessage).toBe('No changes');
  expect(result.current.snackbarMessage).toBe('Data saved successfully');
  expect(result.current.snackbarOpen).toBe(false);
  expect(result.current.isFinalError).toBe(false);
});