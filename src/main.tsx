import { StrictMode } from 'react';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import './theme.pcss';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
