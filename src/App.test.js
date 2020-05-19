import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders Search text', () => {
  const { getByText } = render(<App />);
  const searchText = getByText(/Please search by Username: /i);
  expect(searchText).toBeInTheDocument();
});
