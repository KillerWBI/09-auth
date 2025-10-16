import { cookies } from 'next/headers';
import type { User } from '../types/user';
import { NextServer } from './api';

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await NextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};


export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await NextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
