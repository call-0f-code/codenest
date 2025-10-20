
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/ui/Toast/ToastProvider';
import { ThemeProvider } from './context/ThemeContext';

const queryclient  = new QueryClient(
  {
    defaultOptions:
    {
      queries:{
        refetchOnWindowFocus:false, //disable refetch on window focuse
        staleTime:5*60*1000 //cache for 5 min
      }
    }
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <QueryClientProvider client={queryclient}>
      <ToastProvider>
      <App />
      </ToastProvider>
    </QueryClientProvider>
    </ThemeProvider>

  </StrictMode>
);
