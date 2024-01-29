import axios from 'axios';
import React from 'react';

axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const getUser = async () => {
  const token = localStorage.getItem('token') ?? '';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}user/get`,
    config
  );

  return response.data;
};
