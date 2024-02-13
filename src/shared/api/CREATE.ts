import axios from 'axios';
import Cookies from 'js-cookie';

// import { type ProductInputs } from '@/src/shared/helpers/interfaces';

const API = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get('auth_token') ?? false;

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   }
// };

const configFormdata = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
};

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
      configFormdata
    );

    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}
export async function createSubcategory(data: any) {
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
      configFormdata
    );

    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.response);
  }
}

export async function createProduct(
  data: any,
  codeColors: string[],
  colors: string[],
  amount: number[],
  setAtivoPopUp: React.Dispatch<React.SetStateAction<string>>
) {
  const formData = new FormData();

  let ok = false;

  if (colors) {
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
      configFormdata
    );

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
