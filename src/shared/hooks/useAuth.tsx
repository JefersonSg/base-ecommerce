'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

interface dataUser {
  email: string;
  password: string;
}

// setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>
const useAuth = () => {
  const [token, setToken] = React.useState<string | boolean>(false);
  const [authenticated, setAuthenticated] = React.useState(true);
  const router = useRouter();
  const location = usePathname();

  async function authUser(data: { token: string }) {
    setAuthenticated(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', data.token);
    }
    setToken(data.token);

    router.push('/');
  }

  React.useEffect(() => {
    // Verificar se estamos no ambiente do navegador antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken ?? false);
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      return;
    }

    setAuthenticated(false);
  }, [location, token]);

  function logout() {
    setAuthenticated(false);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }

    axios.defaults.headers.Authorization = '';

    router.push('/login');
  }

  async function login(
    dataUser: dataUser,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      setLoading(true);
      const data = await axios
        .post('http://localhost:3050/user/login', dataUser)
        .then((response) => {
          setLoading(false);
          return response.data;
        });
      await authUser(data);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(false);
      setTimeout(() => {
        setErrorMessage(
          err?.response?.data?.errorsResult?.body[0] ||
            err?.response?.data?.message
        );
      }, 100);
    }
  }
  return { authenticated, logout, login };
};
export default useAuth;
