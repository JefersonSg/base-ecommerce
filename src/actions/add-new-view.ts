'use server';

import axios from 'axios';
import { ADD_NEW_VIEW } from '../shared/functions/api_urls';
import { cookies } from 'next/headers';

const token = cookies().get('auth_token')?.value;

const configJson = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

export async function AddNewView({
  ipUser,
  productId,
  pageView
}: {
  ipUser: string;
  productId: string;
  pageView: string;
}) {
  const { url } = ADD_NEW_VIEW({ productId });
  const sessionId = cookies().get('sessionId')?.value;
  console.log(sessionId);

  void axios.post(
    url,
    {
      userToken: token,
      userIp: ipUser,
      sessionId,
      pageView
    },
    configJson
  );
}
