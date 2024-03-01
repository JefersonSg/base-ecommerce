import axios from 'axios';
import Cookies from 'js-cookie';
import { type FavoriteInterface } from '../helpers/interfaces';

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
export const getUserByToken = async () => {
  if (!token) {
    return null;
  }
  try {
    const response = await axios.get(`${API}user/token`, config);

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
    const response = await fetch(`${API}categories`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllSubcategories = async () => {
  try {
    const response = await fetch(`${API}subcategories/`);

    return await response.json();
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
export const getAllActiveProducts = async () => {
  try {
    const response = await axios.get(`${API}products/actives`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllComments = async (productId: string) => {
  try {
    const response = await axios.get(
      `${API}products/comments/get-all/${productId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllBanners = async () => {
  try {
    const response = await axios.get(`${API}banners/`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllActiveBanners = async () => {
  try {
    const response = await fetch(`${API}banners/actives`);

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// GETS BY ID
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${API}user/get/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API}products/${id}`);

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getFavoritesProducts = async (favorites: any) => {
  try {
    const products = await favorites?.map(
      async (favorite: FavoriteInterface) => {
        const response = await axios.get(
          `${API}products/${favorite?.productId}`,
          config
        );
        return response?.data?.product;
      }
    );
    const FavoriteProducts = await Promise.all(products);

    return FavoriteProducts ?? [];
  } catch (error) {
    console.log(error);

    throw new Error('Ocorreu um erro ao consultar os dados.');
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
export const getSubcategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API}subcategories/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByCategory
export const getProductsByCategory = async (id: string) => {
  try {
    const response = await axios.get(`${API}products/category/${id}`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getSubcategoryByCategory = async (id: string) => {
  try {
    const response = await axios.get(
      `${API}subcategories/category/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getBySubcategory
export const getProductsBySubcategory = async (id: string) => {
  try {
    const response = await axios.get(
      `${API}products/subcategory/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByUserId
export const getFavoriteByUserId = async (id: string) => {
  try {
    const response = await axios.get(
      `${API}favorites/get-by-user/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllItemsCartByUserId = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API}shopping/get-all/${userId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Get CEP
export const getAddress = async () => {
  try {
    const response = await axios.get(`${API}user/address/`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByName
export const getProductByName = async (name: string) => {
  try {
    const response = await axios.get(
      `${API}products/name/${name}`,

      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
