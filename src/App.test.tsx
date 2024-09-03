import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App, { steamLogicsticsLabel } from './App';
import { MockAppWrapper } from './testingUtils/mockAppWrapper';

// Test the rendering of the App component and its interaction with the mock
test('renders steam logistics label within the App component', async () => {
  // FIXME: Causes the test to hang indefinitely
  // await act(async () => {
  //   render(<App />, { wrapper: MockAppWrapper });
  // });

  // Render the App component within the MockAppWrapper
  // render(<App />, { wrapper: MockAppWrapper });

  // Wait for the steam logistics label to appear in the DOM
  // await waitFor(() => {
  //   expect(screen.getByText(steamLogicsticsLabel)).toBeInTheDocument();
  // });
  expect(true).toBe(false); // Keep the test failing for now
});
