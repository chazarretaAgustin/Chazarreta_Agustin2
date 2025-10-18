"use client"; //Ahora es Client Component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  //Inicializa el QueryClient una sola vez
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <html lang="es">
      <body /*estilos*/>
        <header /*navbar*/ />
        
        {/*Envolvemos la aplicación con el proveedor de React Query*/}
        <QueryClientProvider client={queryClient}>
            <main style={{ minHeight: '80vh' }}>
              {children}
            </main>
        </QueryClientProvider>

        <footer /*footer*/ />
      </body>
    </html>
  );
}