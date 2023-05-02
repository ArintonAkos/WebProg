import React, { createContext, useContext } from 'react';
import { CustomToastOptions, useCustomToast } from '../hooks/useCustomToast';

type ShowToastFunction = (options: CustomToastOptions) => void;

const ToastContext = createContext<ShowToastFunction | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
}
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = useCustomToast();

  return <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
};
