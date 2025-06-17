'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { ADD_NEW_VIEW } from '../shared/functions/api_urls';

export async function AddNewView({
  productId,
  pageView
}: {
  productId: string;
  pageView: string;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const configJson = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const { url } = ADD_NEW_VIEW({ productId });

  try {
    await axios.post(
      url,
      {
        userToken: token,
        sessionId,
        pageView
      },
      configJson
    );
  } catch (error) {
    console.error('Erro ao adicionar nova visualização:', error);
  }
}
