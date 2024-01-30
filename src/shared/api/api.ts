import axios from 'axios';
import Cookies from 'js-cookie';

export const getUser = async () => {
  const token = Cookies.get('auth_token') ?? false;
  const API = process.env.NEXT_PUBLIC_API_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  if (!token) {
    return;
  }
  const response = await axios.get(`${API}user/get`, config);

  console.log(response.data);

  return response.data;
};
