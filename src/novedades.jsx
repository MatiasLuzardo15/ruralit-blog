import React from 'react';
import ReactDOM from 'react-dom/client';
import NovedadesCaption from './NovedadesCaption';

const captionRoot = document.getElementById('novedades-caption-root');

if (captionRoot) {
  ReactDOM.createRoot(captionRoot).render(
    <React.StrictMode>
      <NovedadesCaption />
    </React.StrictMode>
  );
}
