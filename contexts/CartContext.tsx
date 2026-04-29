'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CART_QUERY, ADD_TO_CART_MUTATION, REMOVE_ITEMS_FROM_CART_MUTATION, UPDATE_ITEM_QUANTITIES_MUTATION } from '@/lib/graphql/cart';

type CartContextType = {
  cart: any;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (keys: string[]) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading: queryLoading, refetch } = useQuery<any>(GET_CART_QUERY);
  const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);
  const [removeItemsMutation] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION);
  const [updateQuantityMutation] = useMutation(UPDATE_ITEM_QUANTITIES_MUTATION);

  const cart = data?.cart || null;

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await addToCartMutation({
        variables: {
          input: {
            productId,
            quantity,
          },
        },
      });
      await refetch();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (keys: string[]) => {
    try {
      await removeItemsMutation({
        variables: {
          input: {
            keys,
          },
        },
      });
      await refetch();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (key: string, quantity: number) => {
    try {
      await updateQuantityMutation({
        variables: {
          input: {
            items: [{ key, quantity }],
          },
        },
      });
      await refetch();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading: queryLoading, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
