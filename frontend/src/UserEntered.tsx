import React, { useState } from 'react';
import { main } from '../wailsjs/go/models';
import AvatarImage from './AvatarImage';

interface UserEntered {
  message: main.Message;
  index: number;
}

const UserEntered: React.FC<UserEntered> = ({ message, index }) => {
  return (
        <div className="chat-bubble" key={index} style={{ border: `2px solid ${message.color}` }}>
        <div className="chat-message">
          <AvatarImage figure={message.user.figure} type={message.messageType}></AvatarImage>
          <i style={{color: `${message.color}`}}> {message.user.name} {message.message}</i>
        </div>
      </div>
  );
};

export default UserEntered;
