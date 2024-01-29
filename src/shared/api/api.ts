import axios from 'axios';

export const getUser = async () => {
  const token = localStorage.getItem('token') ?? '';
  const API = process.env.NEXT_PUBLIC_API_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.get(`${API}user/get`, config);

  return response.data;
};
