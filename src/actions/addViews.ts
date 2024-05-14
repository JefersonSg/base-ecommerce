'use server';

import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';

const addNewView = async () => {
  const headersList = headers();
  const cookieStore = cookies();
  const userAgentStructure = { headers: headersList };
  const { isBot, browser, device, engine, os, cpu } =
    userAgent(userAgentStructure);

  console.log(isBot);

  return Response.json('ok');
};

export default addNewView;
