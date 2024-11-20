import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '../components/ChatInput';

test('calls onSendMessage when the button is clicked', () => {
  const mockOnSendMessage = jest.fn();
  render(<ChatInput onSendMessage={mockOnSendMessage} />);

  const input = screen.getByPlaceholderText(/Type a message.../i);
  const button = screen.getByText(/Send/i);

  fireEvent.change(input, { target: { value: 'Test Message' } });
  fireEvent.click(button);

  expect(mockOnSendMessage).toHaveBeenCalledWith('Test Message');
  expect(input).toHaveValue('');
});
