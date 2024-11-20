type ChatMessageProps = {
  text: string;
  sender: string;
};

const ChatMessage = ({ text, sender }: ChatMessageProps) => {
  return (
    <div className="p-2 mb-2 rounded bg-white shadow">
      <strong>{sender}:</strong> {text}
    </div>
  );
};

export default ChatMessage;
