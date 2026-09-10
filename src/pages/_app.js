import React, { useState } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/AuthContext';
import FloatingActions from '@/components/FloatingActions';
import { store } from '@/store';

import '@/index.css';
import '@/App.css';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <Head>
              <title>Dharamvir Info Tech | Leading IT Solutions & Software Development</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Component {...pageProps} />
              <FloatingWhatsApp />
              <FloatingActions />
            </div>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
