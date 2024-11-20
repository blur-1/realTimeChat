import { render, screen } from '@testing-library/react';
import ChatMessage from '../components/ChatMessage';

test('renders message with sender', () => {
  render(<ChatMessage text="Hello World" sender="TestUser" />);
  expect(screen.getByText(/TestUser:/i)).toBeInTheDocument();
  expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
});
