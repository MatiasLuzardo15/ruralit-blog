import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogSection from './BlogSection';

console.log('[Ruralit] Starting app...');

const App = () => {
  console.log('[Ruralit] Rendering App component');
  return <BlogSection />;
};

console.log('[Ruralit] Creating React root...');

const root = ReactDOM.createRoot(document.getElementById('react-blog-root'));
console.log('[Ruralit] Root created, rendering...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('[Ruralit] App rendered');