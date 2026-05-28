'use client';

import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/lib/apollo-client';
import { CardinalProvider } from '@/components/providers/CardinalProvider';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <CardinalProvider>
            {children}
            <AuthModal />
          </CardinalProvider>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
