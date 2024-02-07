import axios from 'axios';
import Cookies from 'js-cookie';

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

  formData.append('name', data.title);
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
