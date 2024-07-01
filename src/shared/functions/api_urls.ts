export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PRODUCT_FILTER = ({
  page,
  total,
  active,
  name,
  promotion,
  category,
  subcategory,
  color,
  size,
  minPrice,
  maxPrice,
  brand,
  orderBy,
  orderDirection
}: {
  page: number;
  total: number;
  active?: boolean | string;
  name?: string;
  promotion?: boolean | string;
  category?: string;
  subcategory?: string;
  color?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  orderBy?: string;
  orderDirection?: string;
}) => {
  return {
    url:
      API_URL +
      `products/filter/${page}/${total}/?active=${active}&promotion=${promotion}&category=${category}&subcategory=${subcategory}&name=${name}&color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&orderBy=${orderBy}&orderDirection=${orderDirection}`
  };
};

export const PRODUCT_BY_VIEWS = ({
  page,
  total
}: {
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/get-by-views/${page}/${total}`
  };
};
export const PRODUCT_BY_ID = ({ id }: { id: string }) => {
  return {
    url: API_URL + `products/${id}`
  };
};
export const PRODUCTS_FAVORITES = ({
  userId,
  page,
  total
}: {
  userId: string;
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/${userId}/${page}/${total}`
  };
};

export const CATEGORIES_ALL = () => {
  return {
    url: API_URL + `categories`
  };
};
export const CATEGORY_BY_ID = ({ id }: { id: string }) => {
  return {
    url: API_URL + `categories/${id}`
  };
};
export const SUBCATEGORIES_GET_ALL = () => {
  return {
    url: API_URL + `subcategories`
  };
};
export const SUBCATEGORY_BY_ID = ({ id }: { id: string }) => {
  return {
    url: API_URL + `subcategories/${id}`
  };
};

export const SUBCATEGORIES_BY_CATEGORY_ID = ({
  categoryId
}: {
  categoryId: string;
}) => {
  return {
    url: API_URL + `subcategories/category/${categoryId}`
  };
};
export const BANNERS_ACTIVE = () => {
  return {
    url: API_URL + `banners/actives`
  };
};
export const ADD_NEW_VIEW = ({ productId }: { productId: string }) => {
  return {
    url: API_URL + `views/add/${productId}`
  };
};
