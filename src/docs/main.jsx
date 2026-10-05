import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsApp from './DocsApp.jsx';

const root = document.getElementById('docs-root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DocsApp />
    </React.StrictMode>
  );
}
