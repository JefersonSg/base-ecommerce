'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAuth = () => {
  const [token, setToken] = React.useState<string | boolean>(false);
  const [authenticated, setAuthenticated] = React.useState(false);
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

    router.push('/login');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  async function login(
    dataUser: dataUserLogin,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>
  ) {
    try {
      const data = await axios
        .post(`${API_URL}user/login`, dataUser)
        .then((response) => {
          return response.data;
        });
      await authUser(data);
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      setErrorMessage(false);
      console.log(error);
      setTimeout(() => {
        setErrorMessage(
          error?.response?.data?.errorsResult?.body[0] ||
            error?.response?.data?.message
        );
      }, 100);
    }
  }

  async function registerUser(
    dataUser: dataUserRegister,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>
  ) {
    try {
      const data = await axios
        .post(`${API_URL}user/create`, dataUser)
        .then((response) => {
          return response.data;
        });
      await authUser(data);
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err: any) {
      setErrorMessage(false);
      setTimeout(() => {
        setErrorMessage(
          err?.response?.data?.errorsResult?.body[0] ||
            err?.response?.data?.message
        );
      }, 100);
    }
  }
  return { authenticated, logout, login, registerUser };
};
export default useAuth;
