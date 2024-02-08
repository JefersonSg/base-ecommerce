import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('auth_token') ?? false;
const API = process.env.NEXT_PUBLIC_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

export async function deleteCategory(id: string) {
  const response = await axios.delete(`${API}categories/delete/${id}`, config);

  return response.data;
}
export async function deleteProduct(id: string) {
  const response = await axios.delete(`${API}products/delete/${id}`, config);

  return response.data;
}
