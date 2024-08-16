import React, { useState } from 'react';
import { main } from '../wailsjs/go/models';
import AvatarImage from './AvatarImage';

interface ChatBubbleProps {
  message: main.Message;
  index: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  return (
        <div className="chat-bubble" key={index} style={{ border: `2px solid ${message.color}` }}>
        <div className="chat-message">
          <AvatarImage figure={message.user.figure}></AvatarImage>
          <strong style={{color: `${message.color}`}}> {message.user.name}:</strong>
          {message.messageType === 1 ? (
            <span>{message.message}</span>
          ) : message.messageType === 2 ? (
            <i>{message.message}</i>
          ) : message.messageType === 3 ? (
            <strong>{message.message}</strong>
          ) : (
            <span>Error</span>
          )}
        </div>
      </div>
  );
};

export default ChatBubble;
