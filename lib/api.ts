// src/services/noteService.ts
import axios from "axios";

export const NextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

