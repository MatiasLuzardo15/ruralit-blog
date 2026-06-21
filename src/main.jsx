import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogSection from './BlogSection';
import ChartDemo from './ChartDemo';

const rootBlog = ReactDOM.createRoot(document.getElementById('react-blog-root'));
rootBlog.render(
  <React.StrictMode>
    <BlogSection />
  </React.StrictMode>
);

const rootChart = document.getElementById('react-chart-root');
if (rootChart) {
  ReactDOM.createRoot(rootChart).render(
    <React.StrictMode>
      <ChartDemo />
    </React.StrictMode>
  );
}