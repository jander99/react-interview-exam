import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders Search text', () => {
  const { getByText, getByTestId } = render(<App />)
  const searchText = getByText(/Please search by Username:/i)
  expect(searchText).toBeInTheDocument()

  const searchBox = getByTestId('searchBox')
  expect(searchBox).toBeInTheDocument()
  expect(searchBox.value).toBe('')

  const resultsDiv = getByTestId('resultsDiv')
  expect(resultsDiv).toBeInTheDocument()
});
