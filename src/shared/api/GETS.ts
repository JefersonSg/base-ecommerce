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
  const IdAdmin = process.env.NEXT_PUBLIC_ADMIN_ID;
  if (IdAdmin === response?.currentUser?._id) {
    return Cookies.set('isAdmin', 'true');
  }

  Cookies.remove('isAdmin');
}
export const getUser = async () => {
  if (!token) {
    return;
  }
  try {
    const response = await axios.get(`${API}user/get`, config);

    await isAdmin(response.data);
    return response.data;
  } catch (error) {
    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');

    console.log(error);
  }
};
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API}categories`, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API}products`, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API}products/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
