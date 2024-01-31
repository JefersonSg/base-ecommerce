import axios from 'axios';
import Cookies from 'js-cookie';

function isAdmin(response: any) {
  const IdAdmin = process.env.NEXT_PUBLIC_ADMIN_ID;
  if (IdAdmin === response?.currentUser?._id) {
    return Cookies.set('isAdmin', 'true');
  }

  Cookies.remove('isAdmin');
}
export const getUser = async () => {
  const token = Cookies.get('auth_token') ?? false;
  const API = process.env.NEXT_PUBLIC_API_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  if (!token) {
    return;
  }
  try {
    const response = await axios.get(`${API}user/get`, config);

    isAdmin(response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    Cookies.remove('auth_token');
    Cookies.remove('isAdmin');
    window.location.reload();
  }
};
