import axios from 'axios';

export const getUser = async () => {
  const token = localStorage.getItem('token') ?? false;
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

  return response.data;
};
