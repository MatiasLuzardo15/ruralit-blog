// This file is the entry point for the React application. It renders the BlogSection component into the 'react-blog-root' element and the ChartDemo component into the 'react-chart-root' element if it exists in the DOM.
import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogSection from './BlogSection';
import ChartDemo from './ChartDemo';
import BlogRuralitHeroAnimation from './BlogRuralitHeroAnimation';

const rootHero = document.getElementById('react-hero-root');
if (rootHero) {
  ReactDOM.createRoot(rootHero).render(
    <React.StrictMode>
      <BlogRuralitHeroAnimation />
    </React.StrictMode>
  );
}

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