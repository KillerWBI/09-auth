import axios from "axios";

const envBase = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : null;

// Если NEXT_PUBLIC_API_URL не задан — используем явный localhost (для server-side вызовов)
const API_BASE = envBase ? `${envBase}/api` : `http://localhost:${process.env.PORT ?? 3000}/api`;

export const NextServer = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
