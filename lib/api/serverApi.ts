"use server";

import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import { NextServer } from "./api";
import type { NotesResponse } from "./clientApi";

// ✅ Перевірка сесії
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await NextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

// ✅ Отримання поточного користувача
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await NextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// ✅ Отримання конкретної нотатки
export const getServerNote = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await NextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// ✅ Отримання списку нотаток (з кукі)
export async function fetchNotes(
  search?: string,
  page: number = 1,
  tag?: string
): Promise<NotesResponse> {
  const cookieStore = await cookies();
  const response: AxiosResponse<NotesResponse> = await NextServer.get("/notes", {
    params: {
      page,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

// ✅ Отримання однієї нотатки (з кукі)
export async function getSingleNote(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response: AxiosResponse<Note> = await NextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
