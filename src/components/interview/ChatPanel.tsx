
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Code, Smile } from 'lucide-react';

const ChatPanel = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alex Martinez',
      role: 'interviewer',
      content: 'Welcome to the interview! Feel free to ask any questions about the problem.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'You',
      role: 'candidate',
      content: 'Thank you! Should I optimize for time or space complexity?',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'Alex Martinez',
      role: 'interviewer',
      content: 'Great question! Let\'s focus on time complexity first, then we can discuss space trade-offs.',
      timestamp: '10:33 AM',
      type: 'text'
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        role: 'candidate',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-[#2D2D30] h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-white font-medium">Interview Chat</h3>
        <div className="text-xs text-gray-400 mt-1">
          2 participants • Messages are recorded
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'candidate' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              msg.role === 'candidate' 
                ? 'bg-blue-600 text-white' 
                : 'bg-[#1E1E1E] text-gray-300'
            } rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium opacity-90">{msg.sender}</span>
                <span className="text-xs opacity-70">{msg.timestamp}</span>
              </div>
              <div className="text-sm">{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-[#1E1E1E] border-gray-600 text-white placeholder-gray-400"
          />
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Code className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Smile className="w-4 h-4" />
          </Button>
          <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
