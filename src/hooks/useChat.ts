import { useState, useEffect, useRef } from 'react';

type Message = {
  id: number;
  text: string;
  sender: string;
};

type UseChatReturn = {
  messages: Message[];
  sendMessage: (messageText: string) => void;
  socket: React.MutableRefObject<WebSocket | null>;
};

const useChat = (name: string): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Conexión
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onmessage = (event) => {
      const receivedMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };
    // Cierre de conexión
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const sendMessage = (messageText: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        sender: name,
      };
      socket.current.send(JSON.stringify(newMessage));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { messages, sendMessage, socket };
};

export default useChat;
