import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface IUserData {
  email: string;
  id: number;
  userName: string;
  name: string;
  roles: string[];
}

interface ILoginInfo {
  token: string;
  user: IUserData;
}

interface ISignUpCredentials {
  email: string;
  name: string;
  userName: string;
  password: string;
}
interface ISignInCredentials {
  userName: string;
  password: string;
}
interface AuthContextData {
  user: ILoginInfo | null;
  loading: boolean;
  signUp(data: ISignUpCredentials): Promise<void>;
  signIn(data: ISignInCredentials): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<ILoginInfo | null>(null);

  const loadUserDataFromStorage = useCallback(async () => {
    const values = await Promise.all([
      await AsyncStorage.getItem('@urlShortener:TOKEN'),
      await AsyncStorage.getItem('@urlShortener:USERINFO'),
    ]);
    if (values[0] && values[1]) {
      const data = { token: values[0], user: JSON.parse(values[1]) };
      setUser(data);
    }
  }, []);

  useEffect(() => {
    loadUserDataFromStorage();
  }, [loadUserDataFromStorage]);

  const signIn = useCallback(async (data: ISignInCredentials) => {
    setLoading(true);
    const { userName, password } = data;
    try {
      const userResponse = await api.post('/auth/login', {
        login: userName,
        senha: password,
      });
      const {
        email,
        id,
        login,
        permissoes,
        nome,
      } = userResponse.data.detalhesUsuario;
      const { token } = userResponse.data;

      const saveUserData = {
        id,
        email,
        userName: login,
        roles: permissoes,
        name: nome,
      };

      await AsyncStorage.setItem('@urlShortener:TOKEN', token);
      await AsyncStorage.setItem(
        '@urlShortener:USERINFO',
        JSON.stringify(saveUserData),
      );
      setUser({
        token,
        user: saveUserData,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, []);

  const signUp = useCallback(
    async ({ email, password, name, userName }: ISignUpCredentials) => {
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

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem('@urlShortener:TOKEN');
    await AsyncStorage.removeItem('@urlShortener:USERINFO');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
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
