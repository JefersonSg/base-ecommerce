import {
  revalidatePathAction,
  revalidateTagAction
} from '@/src/actions/revalidates';
import axios from 'axios';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get('auth_token') ?? false;

const configJson = {
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const configFormdata = {
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
};
export async function updateProduct(
  productId: string,
  data: any,
  sizes: string[],
  codeColors: string[],
  colors: string[],
  amount: number[][],
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>,
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>,
  corAtiva: boolean
) {
  const formData = new FormData();

  let ok = false;

  if (colors && corAtiva) {
    colors.forEach((color, indexColor) => {
      sizes.forEach((size, i) => {
        if (color.length < 1) {
          setTypePopUp('error');
          setMessagePopUp('Preencha todos os campos de cores');
          ok = true;
        }
        if (size.length < 1) {
          setTypePopUp('error');
          setMessagePopUp('Preencha todos os campos de tamanho');

          ok = true;
        }
        if (amount[indexColor][i] >= 0) {
          console.log(ok);
        } else {
          setTypePopUp('error');
          setMessagePopUp('Preencha todos os campos de quantidade');
          ok = true;
        }
      });
    });
  }

  amount[0].forEach((amountChild) => {
    if (amountChild.toString().length < 1) {
      setTypePopUp('error');
      setMessagePopUp('Preencha todos os campos de quantidade');
      ok = true;
    }
  });

  if (ok) return;

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append('size', sizes.join(','));
  formData.append('colors', corAtiva ? colors.join(',') : '');
  formData.append('codeColors', corAtiva ? codeColors.join(',') : '');
  formData.append(
    'amount',
    corAtiva ? JSON.stringify(amount) : JSON.stringify([amount[0]])
  );
  if (data.coverPhoto1) {
    formData.append('coverPhoto1', data.coverPhoto1[0]);
  }

  if (data.coverPhoto2) {
    formData.append('coverPhoto2', data.coverPhoto2[0]);
  }

  if (data.images[0]) {
    const imageArray = Array.from(data.images);

    imageArray.forEach((image: any) => {
      formData.append('images', image);
    });
  }
  try {
    const response = await axios.patch(
      `${API}products/edit/${productId}`,
      formData,
      configFormdata
    );

    await revalidateTagAction('all-active-products');
    await revalidateTagAction('all-products');
    await revalidateTagAction(`product-by-id-${productId}`);
    await revalidateTagAction('all-products-by-sales');
    await revalidateTagAction('products-actives');
    await revalidateTagAction('products-by-promotions');

    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      setTypePopUp('error');
      setMessagePopUp(error?.response?.data?.message);
    }
    if (error.response.data.errorsResult.body) {
      Object.keys(error.response.data.errorsResult.body).forEach((key) => {
        setTypePopUp('error');
        setMessagePopUp(error.response.data.errorsResult.body[key]);
      });
    }
  }
}

export async function updateCategory(data: any, id: string) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);

  if (data.image[0]) {
    formData.append('image', data.image[0]);
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.patch(
      `${API}categories/edit/${id}`,
      formData,
      configFormdata
    );
    await revalidateTagAction('all-categories');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateSubcategory(data: any, id: string) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);

  formData.append('category', data.category);

  if (data.image[0]) {
    formData.append('image', data.image[0]);
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.patch(
      `${API}subcategories/edit/${id}`,
      formData,
      configFormdata
    );
    await revalidateTagAction('all-subcategories');

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleStock(data: any, pathnameUrl: string) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key !== 'images' && key !== 'image') {
      formData.append(key, data[key]);
    }
  });

  if (data?.stock?.amount) {
    formData.append('amount', JSON.stringify(data.stock.amount));
  }

  try {
    const response = await axios.patch(
      `${API}${pathnameUrl}${data._id}`,
      formData,
      configFormdata
    );

    if (data?.stock?.amount) {
      await revalidateTagAction('all-products');
      await revalidateTagAction('all-active-products');
      await revalidateTagAction('all-products-by-sales');
      await revalidateTagAction(data?._id);
    }

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function toggleBanner(data: any) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('link', data.link);
  formData.append('active', data.active);

  try {
    const response = await axios.patch(
      `${API}banners/update/${data._id}`,
      formData,
      configFormdata
    );

    await revalidateTagAction('all-banners');
    await revalidateTagAction('all-active-banners');

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function toggleCupom(id: string) {
  try {
    const response = await axios.patch(`${API}cupons/toggle/${id}`, configJson);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateBanner(
  id: string,
  data: {
    name: string;
    link: string;
    imageMobile?: any;
    imageDesktop?: any;
    active: boolean;
  }
) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('link', data.link);
  formData.append('mobile', data.imageMobile[0] ? 'true' : data.imageMobile[0]);
  formData.append(
    'desktop',
    data.imageDesktop[0] ? 'true' : data.imageDesktop[0]
  );
  formData.append('active', `${data?.active}`);

  const imageArray = [];

  if (data.imageMobile[0]) {
    imageArray.push(data.imageMobile[0]);
  }

  if (data.imageDesktop[0]) {
    imageArray.push(data.imageDesktop[0]);
  }
  if (imageArray[0]) {
    imageArray.forEach((image: any) => {
      formData.append('images', image);
    });
  }

  try {
    const response = await axios.patch(
      `${API}banners/update/${id}`,
      formData,
      configFormdata
    );
    await revalidateTagAction('all-banners');
    await revalidateTagAction('all-active-banners');
    await revalidatePathAction('/');

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

// No Revalidation

export async function updateComment(data: {
  commentId: string;
  comment: string;
  stars: number;
  image: any;
  productId: string;
}) {
  const formData = new FormData();

  formData.append('commentId', data.commentId);
  formData.append('comment', data.comment);
  formData.append('stars', `${data.stars}`);

  if (data.image) {
    formData.append('image', data.image[0]);
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.patch(
      `${API}products/update/comment`,
      formData,
      configFormdata
    );

    if (response) {
      await revalidateTagAction(`product-by-id-${data.productId}`);
      await revalidateTagAction(`comments-by-id=${data.productId}`);
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  data: { name: string; surname: string; image?: any },
  userId: string
) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('surname', data.surname);

  if (data.image) {
    formData.append('image', data.image[0]);
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.patch(
      `${API}user/edit/${userId}`,
      formData,
      configFormdata
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateItemCart(
  ItemCartId: string,
  data: { size: string; amount: number; color: string }
) {
  try {
    const response = await axios.patch(
      `${API}shopping/update/${ItemCartId}`,
      data,
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function updateAddress(addressId: string, data: any) {
  try {
    const response = await axios.patch(
      `${API}user/address/update/${addressId}`,
      data,
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function confirmOrder(orderId: string) {
  try {
    const response = await axios.patch(
      `${API}order/confirm/${orderId}`,
      [],
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function cancelOrder(orderId: string) {
  try {
    const response = await axios.patch(
      `${API}order/cancel/${orderId}`,
      [],
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function dispatchedOrder(orderId: string, orderTracking: string) {
  try {
    const response = await axios.patch(
      `${API}order/dispatch/${orderId}`,
      { orderTracking },
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function concludedOrder(orderId: string) {
  try {
    const response = await axios.patch(
      `${API}order/concluded/${orderId}`,
      [],
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
export async function reversalOrder(orderId: string) {
  try {
    const response = await axios.patch(
      `${API}order/reversal/${orderId}`,
      [],
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
