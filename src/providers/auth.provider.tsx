import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface SignUpCredentials {
  email: string;
  name: string;
  userName: string;
  password: string;
}
interface AuthContextData {
  loading: boolean;
  signUp(data: SignUpCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const signUp = useCallback(
    async ({ email, password, name, userName }: SignUpCredentials) => {
      try {
        setLoading(true);
        await api.post('auth/cadastrar/usuario', {
          email,
          senha: password,
          nome: name,
          login: userName,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
