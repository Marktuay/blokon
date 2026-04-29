import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://api.blok-on.com/graphql',
  credentials: 'include', // Crucial para peticiones entre distintas instancias/VMs
});

/**
 * Middleware para añadir el token de sesión de WooCommerce a las peticiones.
 */
const authLink = setContext((_, { headers }) => {
  const session = Cookies.get('woo-session');
  return {
    headers: {
      ...headers,
      'woocommerce-session': session ? `Session ${session}` : '',
    },
  };
});

/**
 * Afterware para capturar el token de sesión de WooCommerce de las respuestas.
 */
const sessionLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const session = headers.get('woocommerce-session');
      if (session) {
        // Guardamos la sesión en una cookie para persistencia cliente-servidor
        Cookies.set('woo-session', session, { 
          secure: true, // Debe ser true para SameSite=None
          sameSite: 'none', // Permite que la cookie se envíe entre distintas instancias/dominios
          expires: 7 
        });
      }
    }

    return response;
  });
});

export const client = new ApolloClient({
  link: from([authLink, sessionLink, httpLink]),
  cache: new InMemoryCache(),
});
