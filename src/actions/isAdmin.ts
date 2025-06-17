import { setCookie } from 'cookies-next';

export async function isAdmin(id: string) {
  if (!id) {
    return;
  }

  await setCookie('isAdmin', id);
  return true;
}
