'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CHECKOUT_MUTATION, UPDATE_ORDER_MUTATION } from '@/lib/graphql/mutations';
import { useCardinal } from '@/components/providers/CardinalProvider';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setup, triggerChallenge } = useCardinal();

  const [checkout] = useMutation(CHECKOUT_MUTATION);
  const [updateOrder] = useMutation(UPDATE_ORDER_MUTATION);

  const processCheckout = async (formData: any) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Crear el pedido en WooCommerce
      const { data: checkoutData } = await checkout({
        variables: {
          input: {
            ...formData,
            // Asegurarse de pasar los flags necesarios para procesar pagos
            paymentMethod: formData.paymentMethod || 'cardinal',
          }
        }
      });

      const { result, cardinal, order } = (checkoutData as any).checkout;

      // 2. Verificar si se requiere autenticación Cardinal (3DS)
      if (cardinal && cardinal.jwt) {
        // Inicializar Cardinal
        await setup(cardinal.jwt);

        // Disparar el Challenge
        const challengeResult = await triggerChallenge({
          acsUrl: cardinal.acsUrl,
          payload: cardinal.payload,
          transactionId: cardinal.transactionId,
          orderDetails: {
            OrderNumber: order.orderNumber,
            Amount: formData.total,
            CurrencyCode: 'MXN' // Ajustar según moneda
          }
        });

        // 3. Evaluar resultado del challenge
        if (challengeResult.data.Validated) {
          // Finalizar la transacción en WooCommerce enviando los datos de validación
          await updateOrder({
            variables: {
              input: {
                id: order.id,
                status: 'PROCESSING',
                customerNote: `3DS Validated: ${challengeResult.data.ActionCode}`
              }
            }
          });
          
          return { success: true, order };
        } else {
          throw new Error('Fallo la autenticación 3D Secure');
        }
      }

      // Si no requiere 3DS y el resultado es exitoso
      if (result === 'SUCCESS') {
        return { success: true, order };
      }

      throw new Error('Error al procesar el pedido');

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    processCheckout,
    loading,
    error
  };
};
