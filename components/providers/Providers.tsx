'use client';

import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/lib/apollo-client';
import { CardinalProvider } from '@/components/providers/CardinalProvider';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <CardinalProvider>
          {children}
        </CardinalProvider>
      </CartProvider>
    </ApolloProvider>
  );
}
