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

async function isAdmin(response: any) {
  const { isAdmin } = response;

  if (isAdmin) {
    return Cookies.set('isAdmin', 'true');
  }

  Cookies.remove('isAdmin');
}
export const getUser = async () => {
  if (!token) {
    return null;
  }
  try {
    const response = await axios.get(`${API}user/get`, config);

    await isAdmin(response.data);
    return response.data;
  } catch (error) {
    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');

    console.log(error);
    return [];
  }
};
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API}categories`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllSubcategories = async () => {
  try {
    const response = await axios.get(`${API}subcategories/`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API}products`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API}products/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API}categories/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
