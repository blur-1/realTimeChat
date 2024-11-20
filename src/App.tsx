import { useState, FormEvent } from 'react';
import ChatApp from './components/ChatApp';
import Button from './components/Button';

const App = () => {
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() !== '') {
      setRegistered(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center p-4">
      {!registered ? (
        <div className="bg-white bg-opacity-35 p-6 rounded-lg shadow-xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <label htmlFor="name" className="block text-white font-medium">
              Enter your name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white bg-opacity-80 placeholder-violet-400"
              placeholder="Your name..."
            />
            <Button type="submit" className="w-full">
              Join Chat
            </Button>
          </form>
        </div>
      ) : (
        <ChatApp name={name} />
      )}
    </div>
  );
};

export default App;
