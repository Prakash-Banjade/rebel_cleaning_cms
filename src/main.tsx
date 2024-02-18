import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary";
import { BreadCrumbProvider } from './context/BreadCrumbContext.tsx'

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<div className='flex items-center justify-center flex-col'>
        <h1 className='px-3 py-5 text-lg font-medium'>Something went wrong! Try again</h1>
        <p>Check console for more info</p>
      </div>
      }>
        <AuthProvider>
          <BreadCrumbProvider>
            <QueryClientProvider client={queryClient}>
              <App />
              <Toaster />
            </QueryClientProvider>
          </BreadCrumbProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
