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

export async function updateCategory(data: any, id: string) {
  const formData = new FormData();

  formData.append('name', data.title);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleStock(data: any) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('brand', data.brand);
  formData.append('price', data.price);
  formData.append('promotion', data.promotion);
  formData.append('promotionPrice', data.promotionPrice);
  formData.append('description', data.description);
  formData.append('colors', data.colors);
  // formData.append('images', data.images);
  formData.append('category', data.category);
  formData.append('codeColors', data.codeColors);
  formData.append('active', data.active);
  formData.append('size', data.size);
  formData.append('amount', data.stock.amount);

  try {
    const response = await axios.patch(
      `${API}products/edit/${data._id}`,
      formData,
      configFormdata
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}
