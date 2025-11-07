"use client"; // Del lado del cliente, necesario para useState y QueryClientProvider

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import Link from 'next/link'; 
import "./globals.css"; 

export default function RootLayout({ children }: { children: ReactNode }) { // Define el layout raiz
  // Inicializa el QueryClient una sola vez
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <html lang="es">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Navbar */}
        <header style={{ 
          padding: '15px', 
          background: '#333', 
          color: 'white', 
          borderBottom: '4px solid #cc0000',
          display: 'flex',
          justifyContent: 'space-between', // Para alinear enlaces
          alignItems: 'center'
        }}>
          <nav>
            <Link 
              href="/" 
              style={{ 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                color: 'white',
                fontSize: '1.2em',
                marginRight: '20px' // Espacio entre enlaces
              }}>
              Lista Principal
            </Link>
            
            {/* Enlace a la página de Favoritos */}
            <Link 
              href="/favorites" 
              style={{ 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                color: '#ffcb05', // Color dorado pokemon
                fontSize: '1.2em' 
              }}>
              ⭐ Favoritos
            </Link>
          </nav>
        </header>
        
        {/* Envuelve "children" con el proveedor de Query */}
        <QueryClientProvider client={queryClient}>
            <main style={{ flex: 1, padding: '20px' }}> {/* flex: 1 para que el footer baje */}
              {children}
            </main>
        </QueryClientProvider>

        {/* FOOTER */}
        <footer style={{ 
          padding: '15px', 
          background: '#f0f0f0', 
          textAlign: 'center', 
          borderTop: '1px solid #ccc',
        }}>
          <p style={{ margin: 0 }}>
           --------- Texto generico ----------
          </p>
        </footer>
      </body>
    </html>
  );
}