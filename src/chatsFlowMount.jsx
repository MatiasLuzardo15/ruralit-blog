import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatsTeamFlowAnimation from './ChatsTeamFlowAnimation';

const root = document.getElementById('react-chats-flow-root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ChatsTeamFlowAnimation />
    </React.StrictMode>
  );
}
