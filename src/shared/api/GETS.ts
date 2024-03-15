import axios from 'axios';
import Cookies from 'js-cookie';
import { type FavoriteInterface } from '../helpers/interfaces';

const token = Cookies.get('auth_token') ?? false;
const API = process.env.NEXT_PUBLIC_API_URL;

const timeRevalidate = 5 * 24 * 60 * 60;

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

export const getTesteCache = async () => {
  try {
    const response = await fetch(`${API}products/teste-cache`, {
      next: {
        revalidate: 10
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
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
    const response = await fetch(`${API}categories`, {
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
    const response = await fetch(`${API}subcategories/`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['subcategories']
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API}products`, {
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
export const getAllActiveProducts = async () => {
  try {
    const response = await fetch(`${API}products/actives`, {
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

export const getProductBySales = async () => {
  try {
    const response = await fetch(`${API}products/sales/get-all`, {
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

export const getAllComments = async (productId: string) => {
  try {
    const response = await fetch(
      `${API}products/comments/get-all/${productId}`,
      {
        next: {
          revalidate: timeRevalidate,
          tags: ['comments']
        }
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getAllBanners = async () => {
  try {
    const response = await fetch(`${API}banners/`, {
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
    const response = await fetch(`${API}banners/actives`, {
      next: {
        revalidate: 0,
        tags: ['all-active-banners']
      }
    });

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
    const response = await fetch(`${API}products/${id}`, {
      next: {
        revalidate: timeRevalidate,
        tags: [`product-${id}`]
      }
    });

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
    const response = await fetch(`${API}products/category/${id}`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['products-by-category-' + id]
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getSubcategoryByCategory = async (id: string) => {
  try {
    const response = await fetch(`${API}subcategories/category/${id}`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['get-subcategories-' + id]
      }
    });

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
    const response = await fetch(`${API}products/subcategory/${id}`, {
      next: {
        revalidate: timeRevalidate,
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
    const response = await fetch(`${API}shopping/get-all/${userId}`, {
      next: {
        revalidate: timeRevalidate,
        tags: ['items-cart-by-user-id-' + userId]
      }
    });

    return await response.json();
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
