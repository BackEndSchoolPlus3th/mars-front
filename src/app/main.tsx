import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "../widgets/navigationBar/component/AuthContext"; 
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
);
