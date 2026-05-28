'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  isLoading: boolean;
  openAuthModal: (callback?: () => void) => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

  // Cargar usuario persistido al montar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('blokon_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading user from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = (callback?: () => void) => {
    if (callback) {
      setOnSuccessCallback(() => callback);
    } else {
      setOnSuccessCallback(null);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnSuccessCallback(null);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulación de login con validación básica
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email.includes('@')) {
          setIsLoading(false);
          resolve({ success: false, error: 'Dirección de correo electrónico inválida.' });
          return;
        }
        if (password.length < 4) {
          setIsLoading(false);
          resolve({ success: false, error: 'La contraseña debe tener al menos 4 caracteres.' });
          return;
        }

        // Simular éxito y extraer nombre del email para hacerlo dinámico
        const mockName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
        const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
        const newUser: User = {
          name: formattedName || 'Cliente Blok-On',
          email: email.toLowerCase()
        };

        setUser(newUser);
        localStorage.setItem('blokon_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        setIsLoading(false);

        // Si había una acción pendiente, la ejecutamos
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null);
        }

        resolve({ success: true });
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!name.trim()) {
          setIsLoading(false);
          resolve({ success: false, error: 'El nombre es obligatorio.' });
          return;
        }
        if (!email.includes('@')) {
          setIsLoading(false);
          resolve({ success: false, error: 'Dirección de correo electrónico inválida.' });
          return;
        }
        if (password.length < 6) {
          setIsLoading(false);
          resolve({ success: false, error: 'La contraseña debe tener al menos 6 caracteres.' });
          return;
        }

        const newUser: User = {
          name: name.trim(),
          email: email.toLowerCase(),
          phone: phone?.trim()
        };

        setUser(newUser);
        localStorage.setItem('blokon_user', JSON.stringify(newUser));
        setIsAuthModalOpen(false);
        setIsLoading(false);

        // Si había una acción pendiente, la ejecutamos
        if (onSuccessCallback) {
          onSuccessCallback();
          setOnSuccessCallback(null);
        }

        resolve({ success: true });
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blokon_user');
    // Recargar página para limpiar estados del carrito y datos de GraphQL
    window.location.reload();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAuthModalOpen,
      isLoading,
      openAuthModal,
      closeAuthModal,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
