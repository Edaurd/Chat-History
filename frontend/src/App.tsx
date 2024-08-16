import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { GetMessages, GetUsersCount } from '../wailsjs/go/main/App';
import { main } from '../wailsjs/go/models';
import AvatarImage from './AvatarImage';
import ChatBubble from './ChatBubble';
import UserEntered from './UserEntered';

const App: React.FC = () => {
  const [messages, setMessages] = useState<main.Message[]>([]);
  const [userCount, setUserCount] = useState<number>(0); // State for user count
  const chatLogRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true); // Ref to keep track of auto-scroll state

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs: main.Message[] = await GetMessages();
      setMessages(msgs);
    };

    const fetchUserCount = async () => {
      const count: number = await GetUsersCount();
      setUserCount(count);
    };

    fetchMessages();
    fetchUserCount();
    const interval = setInterval(() => {
      fetchMessages();
      fetchUserCount();
    }, 3000); // Fetch messages and user count every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const chatLog = chatLogRef.current;
    if (chatLog && autoScrollRef.current) {
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const chatLog = chatLogRef.current;
    if (chatLog) {
      // Check if the user has scrolled up
      const isScrolledUp = chatLog.scrollTop + chatLog.clientHeight < chatLog.scrollHeight;
      autoScrollRef.current = !isScrolledUp; // Disable auto-scroll if user has scrolled up
    }
  };



  return (
    <div className="container">
      <div className="chat-container" ref={chatLogRef} onScroll={handleScroll}>
        {messages.map((msg, index) => (
          msg.messageType == 4 || msg.messageType == 5 ? <UserEntered message={msg} index={index}/> : <ChatBubble message={msg} index={index}/>
        ))}
      </div>
      <div className="user-count-bar">Users: {userCount}</div>
    </div>
  );
};

export default App;
