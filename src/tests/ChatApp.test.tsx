import { render, screen } from '@testing-library/react';
import ChatApp from '../components/ChatApp';

test('renders ChatApp correctly', () => {
  render(<ChatApp name="Test User" />);
  expect(screen.getByText(/No messages yet.../i)).toBeInTheDocument();
});
