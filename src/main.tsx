import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import useTheme from './store/useTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const Root = () => {
  const { theme } = useTheme();
  return <div className={theme}><App /><Toaster position="top-right" reverseOrder={false} /></div>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);