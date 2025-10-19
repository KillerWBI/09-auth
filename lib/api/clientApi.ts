import type { AxiosResponse } from "axios";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import { NextServer } from './api';

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

// Тип відповіді для колекції нотаток
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await NextServer.patch<User>("/users/me", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const logout = async (): Promise<void> => {
  await NextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await NextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await NextServer.get<User>('/users/me');
  return data;
};

export const login = async (data: LoginRequest) => {
  const res = await NextServer.post<User>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await NextServer.post<User>('/auth/register', data);
  return res.data;
};

// 1. Отримати список нотаток (підтримує пагінацію та пошук)


// 2. Створити нову нотатку
export async function createNote(data: NewNoteData): Promise<Note> {
  const response: AxiosResponse<Note> = await NextServer.post("/notes", data);
  return response.data;
}

// 3. Видалити нотатку
export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await NextServer.delete(`/notes/${id}`);
  return response.data;
}


