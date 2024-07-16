import React from 'react';
import useAuth from '../hooks/useAuth';

interface dataUserLogin {
  email: string;
  password: string;
}
interface dataUserRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmpassword: string;
}
interface UserContextType {
  authenticated: boolean;
  logout: () => Promise<void>;
  login: (
    dataUser: dataUserLogin,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  registerUser: (
    dataUser: dataUserRegister,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

const UserContext = React.createContext<UserContextType>({
  authenticated: false,
  registerUser: async () => {},
  logout: async () => {},
  login: async () => {}
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const { authenticated, logout, login, registerUser } = useAuth();
  return (
    <UserContext.Provider
      value={{ authenticated, logout, login, registerUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);

export { UserContext, UserProvider };
