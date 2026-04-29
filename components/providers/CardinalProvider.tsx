'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import Script from 'next/script';

interface CardinalContextType {
  setup: (jwt: string) => Promise<void>;
  triggerChallenge: (data: any) => Promise<any>;
}

const CardinalContext = createContext<CardinalContextType | undefined>(undefined);

export const useCardinal = () => {
  const context = useContext(CardinalContext);
  if (!context) {
    throw new Error('useCardinal debe ser usado dentro de un CardinalProvider');
  }
  return context;
};

export const CardinalProvider = ({ children }: { children: ReactNode }) => {
  
  const setup = (jwt: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!window.Cardinal) {
        return reject('Cardinal SDK no cargado');
      }

      window.Cardinal.configure({
        logging: {
          level: process.env.NODE_ENV === 'development' ? 'on' : 'off'
        }
      });

      window.Cardinal.on('payments.validated', (data: any, jwt: string) => {
        // Este evento se maneja usualmente en el triggerChallenge
        console.log('Cardinal Validated:', data);
      });

      window.Cardinal.setup('init', {
        jwt: jwt
      });

      // Cardinal setup es asíncrono pero no devuelve promesa nativa
      // Resolvemos inmediatamente o después de un evento específico si es necesario
      resolve();
    });
  };

  const triggerChallenge = (continueData: any): Promise<any> => {
    return new Promise((resolve) => {
      if (!window.Cardinal) {
        throw new Error('Cardinal SDK no cargado');
      }

      // Escuchar el resultado de la validación
      window.Cardinal.on('payments.validated', (data: any, jwt: string) => {
        resolve({ data, jwt });
      });

      // Disparar el flujo de autenticación 3DS
      window.Cardinal.continue(
        'cca',
        {
          AcsUrl: continueData.acsUrl,
          Payload: continueData.payload,
          TransactionId: continueData.transactionId
        },
        {
          // Datos opcionales de la orden
          OrderDetails: continueData.orderDetails
        }
      );
    });
  };

  return (
    <CardinalContext.Provider value={{ setup, triggerChallenge }}>
      <Script
        src="https://songbird.cardinalcommerce.com/edge/v1/songbird.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Cardinal Songbird SDK cargado')}
      />
      {children}
    </CardinalContext.Provider>
  );
};
