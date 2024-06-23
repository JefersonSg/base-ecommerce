export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PRODUCT_ACTIVES = ({
  page,
  total
}: {
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/actives/${page}/${total}`
  };
};

export const PRODUCT_BY_SALES = ({
  page,
  total
}: {
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/sales/${page}/${total}`
  };
};
export const PRODUCT_BY_NAME = ({
  name,
  page,
  total
}: {
  name: string;
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/name/${name}/${page}/${total}`
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
export const PRODUCT_BY_PROMOTIONS = ({
  page,
  total
}: {
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/promotion/${page}/${total}`
  };
};

export const PRODUCT_BY_CATEGORY = ({
  id,
  page,
  total
}: {
  id: string;
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/category/${id}/${page}/${total}`
  };
};

export const PRODUCT_BY_SUBCATEGORY = ({
  id,
  page,
  total
}: {
  id: string;
  page: number;
  total: number;
}) => {
  return {
    url: API_URL + `products/subcategory/${id}/${page}/${total}`
  };
};
