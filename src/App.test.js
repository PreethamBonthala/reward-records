import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rewards Record section', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rewards Record/i);
  expect(linkElement).toBeInTheDocument();
});
