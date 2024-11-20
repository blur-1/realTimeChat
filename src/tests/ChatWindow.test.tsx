import { render, screen } from '@testing-library/react';
import ChatWindow from '../components/ChatWindow';

const mockMessages = [
  { id: 1, text: 'Hello', sender: 'User1' },
  { id: 2, text: 'Hi there!', sender: 'User2' },
];

test('displays messages correctly', () => {
  render(<ChatWindow messages={mockMessages} />);
  expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  expect(screen.getByText(/Hi there!/i)).toBeInTheDocument();
});

test('shows no messages yet text when message list is empty', () => {
  render(<ChatWindow messages={[]} />);
  expect(screen.getByText(/No messages yet.../i)).toBeInTheDocument();
});
