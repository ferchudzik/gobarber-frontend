import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface IToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldState => [...oldState, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldState => oldState.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('erro');
  }

  return context;
};
