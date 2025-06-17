'use server';

import axios from 'axios';
import { ADD_NEW_VIEW } from '../shared/functions/api_urls';
import { cookies } from 'next/headers';

export async function AddNewView({
  productId,
  pageView
}: {
  productId: string;
  pageView: string;
}) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const { url } = ADD_NEW_VIEW({ productId });

  const configJson = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  void axios.post(
    url,
    {
      userToken: token,
      sessionId,
      pageView
    },
    configJson
  );
}
