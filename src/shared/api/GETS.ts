import axios from 'axios';
import Cookies from 'js-cookie';
import {
  type UserInterface,
  type FavoriteInterface
} from '../helpers/interfaces';
import getCookie from '@/src/actions/getCookie';

const token = Cookies.get('auth_token') ?? false;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

export const getAllBanners = async () => {
  try {
    const response = await fetch(`${API_URL}banners/`, {
      next: {
        revalidate: 0,
        tags: ['all-banners']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}order/get-all`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getConfirmedOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}order/get-confirmed`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
// No revalidate
export const getUserByToken = async (token2?: string) => {
  if (!token && !token2) {
    return [];
  }
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token || token2}`,
      'Content-Type': 'application/json'
    }
  };
  try {
    const response: { data: UserInterface } = await axios.get(
      `${API_URL}user/token`,
      configHeader
    );

    if (response.data) {
      return response.data;
    } else {
      Cookies.remove('auth_token');
      Cookies.remove('isAdmin');
    }
  } catch (error) {
    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');

    console.log(error);
    return [];
  }
};

export const getAllComments = async (productId: string) => {
  try {
    const response = await fetch(
      `${API_URL}products/comments/get-all/${productId}`,
      {
        next: {
          revalidate: 0,
          tags: [`comments-by-id=${productId}`]
        }
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// GET BY ID
// revalidate
export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}user/get/${userId}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFavoritesProducts = async (favorites: any) => {
  try {
    if (!favorites) {
      return;
    }
    const products = await favorites?.map(
      async (favorite: FavoriteInterface) => {
        const response = await axios.get(
          `${API_URL}products/${favorite?.productId}`,
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

// no revalidate
export const getOrderById = async (orderId: string) => {
  try {
    const response = await fetch(
      `${API_URL}order/get-order-by-id/${orderId}`,
      config
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByCategory

export const getSubcategoryByCategory = async (categoryId: string) => {
  try {
    const response = await fetch(
      `${API_URL}subcategories/category/${categoryId}`,
      {
        next: {
          revalidate: 0,
          tags: ['get-subcategories-' + categoryId]
        }
      }
    );

    if (response) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByUserId
export const getFavoriteByUserId = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_URL}favorites/get-by-user/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllItemsCartByUserId = async (userId: string, cep?: string) => {
  const cookie = await getCookie({ nameCookie: 'cart_id' });

  try {
    const response = await axios.post(
      `${API_URL}shopping/get-all`,
      { cep, cartId: cookie?.value, userId },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getOrderByUserId = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}order/get-order-by-user-id/${userId}`,
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
    const response = await axios.get(`${API_URL}user/address/`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCep = async (cep: string) => {
  try {
    const response = await axios.post(
      `${API_URL}delivery/consult-cep/`,
      { cep },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const calculateDelivery = async (cep: string) => {
  try {
    const response = await axios.post(
      `${API_URL}delivery/calculate/`,
      { cep },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByName

//
export const getViews = async (daysAgo?: number) => {
  try {
    const response = await axios.get(
      `${API_URL}views/get-all-views/${daysAgo ?? 0}`,

      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllCupons = async () => {
  try {
    const response = await axios.get(
      `${API_URL}cupons/get-all`,

      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${API_URL}user/get-all-users`,

      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
