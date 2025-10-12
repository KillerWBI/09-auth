// src/services/noteService.ts
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Note } from "../types/note";

export const NextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});


export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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



export const logout = async (): Promise<void> => {
  await NextServer.post('/auth/logout')
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


export async function getSingleNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await NextServer.get(`/notes/${id}`);
  return response.data;
}
