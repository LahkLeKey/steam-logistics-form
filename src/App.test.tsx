import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { steamLogicsticsLabel } from './App';

test('renders steam logicstics label', () => {
  render(<App />);
  const linkElement = screen.getByText(steamLogicsticsLabel);
  expect(linkElement).toBeInTheDocument();
});
