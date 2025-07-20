import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { MusicProvider } from './contexts/MusicContext'
import { NotificationProvider } from './contexts/NotificationContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <NotificationProvider>
          <MusicProvider>
            <App />
          </MusicProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
) 