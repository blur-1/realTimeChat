import ChatMessage from './ChatMessage';

type ChatWindowProps = {
  messages: { id: number; text: string; sender: string }[];
};

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white bg-opacity-35">
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))
      ) : (
        <p className="text-center text-white">No messages yet...</p>
      )}
    </div>
  );
};

export default ChatWindow;
