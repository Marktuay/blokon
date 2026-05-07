import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

// Lógica forzada para evitar que Next.js inyecte la URL de WordPress en el cliente
let graphqlUri = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://api.blok-on.com/graphql';

if (typeof window !== 'undefined') {
  // En el navegador, SIEMPRE usamos el proxy relativo
  graphqlUri = '/api/graphql';
}

const httpLink = createHttpLink({
  uri: graphqlUri,
});

/**
 * Middleware para añadir el token de sesión de WooCommerce a las peticiones.
 */
const authLink = setContext((_, { headers }) => {
  const session = Cookies.get('woo-session');
  
  if (!session) {
    return { headers };
  }

  return {
    headers: {
      ...headers,
      'woocommerce-session': `Session ${session}`,
    },
  };
});

/**
 * Afterware para capturar el token de sesión de WooCommerce de las respuestas.
 */
const sessionLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: any;
    if (forward) {
      handle = forward(operation).subscribe({
        next: (response) => {
          const context = operation.getContext();
          const headers = context.response?.headers;

          if (headers && typeof window !== 'undefined') {
            const session = headers.get('woocommerce-session');
            if (session) {
              Cookies.set('woo-session', session, { 
                secure: true, 
                sameSite: 'none', 
                expires: 7 
              });
            }
          }
          observer.next(response);
        },
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    }
    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

export const client = new ApolloClient({
  link: from([authLink, sessionLink, httpLink]),
  cache: new InMemoryCache(),
});
