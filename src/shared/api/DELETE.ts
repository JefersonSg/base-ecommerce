import { revalidateTagAction } from '@/src/actions/revalidates';
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

// Revalidations

export async function deleteBanner(id: string) {
  try {
    const response = await axios.delete(`${API}banners/delete/${id}`, config);
    await revalidateTagAction('all-active-banners');
    await revalidateTagAction('all-banners');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId: string) {
  const response = await axios.delete(
    `${API}products/delete/${productId}`,
    config
  );
  await revalidateTagAction('all-active-products');
  await revalidateTagAction('all-products');
  await revalidateTagAction(`product-${productId}`);
  await revalidateTagAction('all-products-by-sales');

  return response.data;
}

export async function deleteSubcategory(id: string) {
  const response = await axios.delete(
    `${API}subcategories/delete/${id}`,
    config
  );
  await revalidateTagAction('all-subcategories');
  return response.data;
}

export async function deleteCategory(id: string) {
  const response = await axios.delete(`${API}categories/delete/${id}`, config);

  await revalidateTagAction('all-categories');

  return response.data;
}

// No revalidate
export async function deleteCartItem(itemCartId: string) {
  const response = await axios.delete(
    `${API}shopping/delete/${itemCartId}`,
    config
  );

  return response.data;
}
export async function deleteComment(idComment?: string) {
  const response = await axios.delete(
    `${API}products/delete/comment/${idComment}`,
    config
  );

  return response.data;
}
export async function deleteFavorite(id: string) {
  const response = await axios.delete(`${API}favorites/delete/${id}`, config);

  return response.data;
}
