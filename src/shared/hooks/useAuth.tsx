import Cookie from 'js-cookie';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import getCookie from '@/src/actions/getCookie';
import removeCookie from '@/src/actions/removeCookie';

interface dataUserLogin {
  email: string;
  password: string;
}
interface dataUserRegister {
  name: string;
  surname: string;
  cartId?: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAuth = () => {
  const [token, setToken] = React.useState<string | boolean>(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const router = useRouter();

  async function authUser(data: { token: string }) {
    setAuthenticated(true);

    Cookie.set('auth_token', data.token, { expires: 2 });
    Cookie.remove('isAdmin');
    setToken(data.token);

    if (typeof window === 'undefined') {
      return;
    }
    window.location.reload();
  }

  React.useEffect(() => {
    if (!token) {
      const authToken = Cookie.get('auth_token') ?? false;
      setAuthenticated(!!authToken);
      setToken(authToken);
    }
  }, [token]);

  async function logout() {
    setAuthenticated(false);
    Cookie.remove('auth_token');
    Cookie.remove('isAdmin');
    removeCookie({ nameCookie: 'cart_id' });
    if (typeof window === 'undefined') {
      return;
    }
    window.location.reload();
  }

  async function login(
    dataUser: dataUserLogin,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) {
    try {
      const data = await axios.post(`${API_URL}user/login`, dataUser);

      await authUser(data.data);
    } catch (error: any) {
      setErrorMessage('');
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
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) {
    const cookie = await getCookie({ nameCookie: 'cart_id' });
    try {
      const data = await axios.post(`${API_URL}user/register`, {
        name: dataUser.name,
        surname: dataUser.surname,
        cartId: cookie ? cookie.value : '',
        email: dataUser.email,
        password: dataUser.password,
        confirmpassword: dataUser.confirmpassword
      });

      await authUser(data.data);
      router.push('/');
    } catch (err: any) {
      setErrorMessage('');
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
