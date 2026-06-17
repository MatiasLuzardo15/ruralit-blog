import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogSection from './BlogSection';

const App = () => {
  return <BlogSection />;
};

const root = ReactDOM.createRoot(document.getElementById('react-blog-root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);