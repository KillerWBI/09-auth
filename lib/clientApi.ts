import type { User } from '../types/user';
import { NextServer } from './api';

export async function register(data: { email: string; password: string }) {
  const res = await NextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await NextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function logout() {
  await NextServer.post('/auth/logout');
}
