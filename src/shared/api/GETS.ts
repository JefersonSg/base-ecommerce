import axios from 'axios';
import Cookies from 'js-cookie';
import {
  type UserInterface,
  type FavoriteInterface
} from '../helpers/interfaces';

const token = Cookies.get('auth_token') ?? false;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const timeRevalidate = 2 * 24 * 60 * 60;
const timeRevalidate = 10 * 60;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

// Revalidates

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}products`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['all-products']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductBySales = async () => {
  try {
    const response = await fetch(`${API_URL}products/sales/get-all`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['all-products-by-sales']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllActiveProducts = async () => {
  try {
    const response = await fetch(`${API_URL}products/actives`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['all-active-products']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getNoActiveProducts = async () => {
  try {
    const response = await fetch(`${API_URL}products/no-actives`, {
      next: {
        revalidate: 0
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getProductsByViews = async () => {
  try {
    const response = await fetch(`${API_URL}products/views/get-by-views`, {
      next: {
        revalidate: 0
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_URL}categories`, {
      next: {
        revalidate: 10,
        tags: ['all-categories']
      }
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllSubcategories = async () => {
  try {
    const response = await fetch(`${API_URL}subcategories/`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['all-subcategories']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
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
export const getAllActiveBanners = async () => {
  try {
    const response = await fetch(`${API_URL}banners/actives`, {
      next: {
        revalidate: 3600,
        tags: ['all-active-banners']
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
export const getProductById = async (productId: string) => {
  try {
    const response = await fetch(`${API_URL}products/${productId}`, {
      next: {
        revalidate: 0,
        tags: [`product-by-id=${productId}`, `${productId}`]
      }
    });

    return await response.json();
  } catch (error) {
    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');
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

export const getSubcategoryById = async (subcategoryId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}subcategories/${subcategoryId}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
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

export const getCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}categories/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getByCategory
export const getProductsByCategory = async (categoryId: string) => {
  try {
    const response = await fetch(`${API_URL}products/category/${categoryId}`, {
      next: {
        revalidate: 0,
        tags: ['products-by-category-' + categoryId]
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
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

// getBySubcategory
export const getProductsBySubcategory = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}products/subcategory/${id}`, {
      next: {
        revalidate: 0,
        tags: ['products-by-subcategory-' + id]
      }
    });

    return await response.json();
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
  try {
    const response = await axios.post(
      `${API_URL}shopping/get-all/${userId}`,
      { cep },
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
export const getProductByName = async (name: string) => {
  try {
    const response = await axios.get(
      `${API_URL}products/name/${name}`,

      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

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
