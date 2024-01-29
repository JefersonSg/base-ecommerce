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
  const [token, setToken] = React.useState(
    window.localStorage.getItem('token') ?? false
  );
  const [authenticated, setAuthenticated] = React.useState(true);
  const router = useRouter();
  const location = usePathname();

  async function authUser(data: { token: string }) {
    setAuthenticated(true);

    window.localStorage.setItem('token', data.token);

    router.push('/');
  }

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
    window.localStorage.removeItem('token');
    axios.defaults.headers.Authorization = '';

    router.push('/login');
    window.location.reload();
  }

  async function login(
    dataUser: dataUser,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | boolean>>
  ) {
    try {
      const data = await axios
        .post('http://localhost:3050/user/login', dataUser)
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
      await authUser(data);
    } catch (err: any) {
      console.log('erro');
      console.log(dataUser);
      console.log(err);
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
