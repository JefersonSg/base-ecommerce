import axios from 'axios';
import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get('auth_token') ?? false;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

export async function createCategory(
  name: string,
  description: string,
  image: File
) {
  const formData = new FormData();

  formData.append('title', name);
  formData.append('description', description);
  formData.append('image', image);

  if (!token) {
    return;
  }

  try {
    const response = await axios.post(
      `${API}categories/create`,
      formData,
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
