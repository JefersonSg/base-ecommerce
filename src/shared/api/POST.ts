import axios from 'axios';
import Cookies from 'js-cookie';
import {
  type ProductApi,
  type BannerTypeCreate,
  type cuponsInterface
} from '../helpers/interfaces';
import { revalidateTagAction } from '@/src/actions/revalidates';

const API = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get('auth_token') ?? false;

const configJson = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const configFormData = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
};

export async function addNewItemCart(data: {
  productId: string;
  userId: string;
  size: string;
  amount: string | number;
  color: string;
}) {
  try {
    const response = await axios.post(
      `${API}shopping/create`,
      data,
      configJson
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createAddress(data: any) {
  try {
    const response = await axios.post(
      `${API}user/address/create`,
      data,
      configJson
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function addViews(
  ip: string,
  productId?: string,
  userToken?: string | undefined
) {
  try {
    void axios.post(
      `${API}views/add/${productId}`,
      {
        userToken,
        userIp: ip
      },
      configJson
    );
  } catch (error) {
    console.log(error);
  }
}

// Revalidation

export async function createProduct(
  data: any,
  codeColors: string[],
  colors: string[],
  amount: number[],
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>,
  corAtiva: boolean
) {
  const formData = new FormData();

  let ok = false;

  if (colors && corAtiva) {
    colors.forEach((color, index) => {
      if (color.length < 1) {
        setAtivoPopUp('Preencha todos os campos de cores');
        ok = true;
      }
      if (amount[index] >= 0) {
        console.log(ok);
      } else {
        setAtivoPopUp('Preencha todos os campos de quantidade');
        ok = true;
      }
    });
  }
  if (!amount[0]) {
    setAtivoPopUp('Preencha todos os campos de quantidade');
    return;
  }

  if (ok) return;

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append('amount', amount.toString());
  formData.append('colors', colors.join(','));
  formData.append('codeColors', codeColors.join(','));

  if (data.images) {
    const imageArray = Array.from(data.images);

    imageArray.forEach((image: any) => {
      formData.append('images', image);
    });
  }
  try {
    const response = await axios.post(
      `${API}products/create`,
      formData,
      configFormData
    );

    await revalidateTagAction('all-products');
    await revalidateTagAction('all-active-products');
    await revalidateTagAction('all-products-by-sales');

    return response.data;
  } catch (error: any) {
    console.log(error);

    if (error.response.data.errorsResult.body) {
      Object.keys(error.response.data.errorsResult.body).forEach((key) => {
        setAtivoPopUp(error.response.data.errorsResult.body[key]);
      });
    }
  }
}
export async function duplicateProduct(
  data: ProductApi,

  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>
) {
  const formData = new FormData();

  const ok = false;

  if (ok) return;

  // Object.keys(data).forEach((key) => {
  //   formData.append(key, data[key]);
  // });
  formData.append('name', data.name);
  formData.append('active', `${data.active}`);
  formData.append('brand', data.brand);
  formData.append('category', data.category);
  if (data?.subcategory) {
    formData.append('subcategory', data?.subcategory);
  }
  formData.append('characteristic', `${data.characteristic}`);
  formData.append('composition', `${data.composition}`);

  formData.append('amount', data.stock.amount.toString());
  if (data?.colors) {
    formData.append('colors', data?.colors.join(','));
  }
  if (data.codeColors) {
    formData.append('codeColors', data.codeColors.join(','));
  }

  if (data.images) {
    const imageArray = Array.from(data.images);

    imageArray.forEach((image: any) => {
      formData.append('images', image);
    });
  }
  try {
    const response = await axios.post(
      `${API}products/create`,
      formData,
      configFormData
    );

    await revalidateTagAction('all-products');
    await revalidateTagAction('all-active-products');
    await revalidateTagAction('all-products-by-sales');

    return response.data;
  } catch (error: any) {
    console.log(error);

    if (error.response.data.errorsResult.body) {
      Object.keys(error.response.data.errorsResult.body).forEach((key) => {
        setAtivoPopUp(error.response.data.errorsResult.body[key]);
      });
    }
  }
}
export async function addFavorite(user: string, product: string) {
  try {
    const response = await axios.post(
      `${API}favorites/create`,
      {
        userId: user,
        productId: product
      },
      configJson
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function createBanner(data: BannerTypeCreate) {
  const formData = new FormData();

  formData.append('name', data?.name);
  formData.append('link', data?.link);
  formData.append('active', `${data?.active}`);

  if (data.imageMobile && data.imageDesktop) {
    const imageArray = [data.imageMobile[0], data.imageDesktop[0]];

    imageArray.forEach((image: any) => {
      formData.append('images', image);
    });
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.post(
      `${API}banners/create`,
      formData,
      configFormData
    );

    await revalidateTagAction('all-active-banners');

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}
export async function createCategory(data: any) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);

  if (data.image[0] instanceof Blob) {
    formData.append('image', data.image[0]);
  } else {
    console.error('O campo de imagem não é do tipo Blob.');
    return;
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.post(
      `${API}categories/create`,
      formData,
      configFormData
    );

    await revalidateTagAction('all-categories');

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}
export async function createSubcategory(data: {
  name: string;
  description: string;
  category: string;
  image: any;
}) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('category', data.category);

  if (data.image[0] instanceof Blob) {
    formData.append('image', data.image[0]);
  } else {
    console.error('O campo de imagem não é do tipo Blob.');
    return;
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.post(
      `${API}subcategories/create`,
      formData,
      configFormData
    );

    await revalidateTagAction('all-subcategories');
    await revalidateTagAction('get-subcategories-' + data.category);

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}

export async function createComment(data: any, productId: string) {
  const formData = new FormData();

  formData.append('comment', data?.comment);
  formData.append('userId', data?.userId);
  formData.append('stars', data?.stars);
  formData.append('productId', productId);

  if (data?.image) {
    formData.append('image', data.image[0]);
  }

  try {
    if (!token) {
      console.log('sem token de acesso');
      return;
    }

    const response = await axios.post(
      `${API}products/create/comment/`,
      formData,
      configFormData
    );

    if (response) {
      await revalidateTagAction(`product-by-id-${productId}`);
      await revalidateTagAction(`comments-by-id=${productId}`);
    }

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}

export async function createNewOrder(
  userId: string,
  methodPayment: string,
  serviceShippingId: number,
  setPopUpMessage: React.Dispatch<React.SetStateAction<string>>,
  cupom?: string
) {
  if (!userId) {
    setPopUpMessage('você não está logado');
    return;
  }
  if (!methodPayment) {
    setPopUpMessage('Selecione um método de pagamento');
    return;
  }
  if (!serviceShippingId) {
    setPopUpMessage('Selecione um método de envio');
    return;
  }

  try {
    const response = await axios.post(
      `${API}order/create/${userId}`,
      {
        cupom,
        methodPayment,
        serviceShippingId
      },
      configJson
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createNewCupom(data: cuponsInterface) {
  try {
    const response = await axios.post(`${API}cupons/create`, data, configJson);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function redeemCoupon(code: string, valorDaCompra: number) {
  try {
    const response = await axios.post(
      `${API}cupons/redeem`,
      {
        code,
        valorDaCompra
      },
      configJson
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}
