import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import useChat from '../hooks/useChat';

type ChatAppProps = {
  name: string;
};

const ChatApp = ({ name }: ChatAppProps) => {
  const { messages, sendMessage } = useChat(name);

  return (
    <div className="flex flex-col max-w-lg mx-auto h-[80vh] mt-10 border border-gray-300 rounded shadow-xl">
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatApp;
