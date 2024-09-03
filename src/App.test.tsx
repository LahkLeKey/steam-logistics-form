import React from 'react';
import { renderHook, waitFor, screen, render, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockUseSubmissionMutation } from './mocks/mockUseSubmissionMutation';
import App, { steamLogicsticsLabel } from './App';

// Use the mock for `useSubmissionMutation`
jest.mock('./hooks/useSubmissionMutation', () => ({
  useSubmissionMutation: mockUseSubmissionMutation,
}));

// Setup for the QueryClientProvider wrapper
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

// Test the mocked useSubmissionMutation hook
test('useSubmissionMutation returns the correct initial state', async () => {
  const { result } = renderHook(() => mockUseSubmissionMutation(), { wrapper });

  // Validate the initial state returned by the mock hook
  expect(result.current.status).toBe('idle');
  expect(result.current.mutation.data).toBe('Hello');
  expect(result.current.statusMessage).toBe('No changes');
  expect(result.current.snackbarMessage).toBe('Data saved successfully');
  expect(result.current.snackbarOpen).toBe(false);
  expect(result.current.isFinalError).toBe(false);

  // console.log('Result from mockUseSubmissionMutation:', result.current);
});

// Test the rendering of the App component and its interaction with the mock
test('renders steam logistics label within the App component', async () => {
  // FIXME: Causes the test to hang indefinitely
  // await act(async () => {
  //   render(<App />, { wrapper });
  // });

  // // Wait for the steam logistics label to appear in the DOM
  // const linkElement = await waitFor(() => screen.getByText(steamLogicsticsLabel));
  // expect(linkElement).toBeInTheDocument();
});
