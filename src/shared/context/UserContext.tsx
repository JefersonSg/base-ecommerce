import React from 'react';
import useAuth from '../hooks/useAuth';

interface dataUser {
  email: string;
  password: string;
}
interface UserContextType {
  authenticated: boolean;
  logout: () => void;
  login: (
    dataUser: dataUser,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

const Context = React.createContext<UserContextType>({
  authenticated: false,
  logout: () => {},
  login: async () => {}
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const { authenticated, logout, login } = useAuth();
  return (
    <Context.Provider value={{ authenticated, logout, login }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
