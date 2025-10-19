import type { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '../../types/note';
import type { User } from '../../types/user';
import { NextServer } from './api';
import type { NotesResponse } from './clientApi';

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

// New: отримати нотатку серверно за id
export const getServerNote = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await NextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: string
): Promise<NotesResponse> {
  const response: AxiosResponse<NotesResponse> = await NextServer.get("/notes", {
    params: {
      page,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return response.data;
}

export async function getSingleNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await NextServer.get(`/notes/${id}`);
  return response.data;
}
