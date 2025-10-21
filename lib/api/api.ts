import axios from "axios";

const envBase = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : "http://localhost:3000";

// Если NEXT_PUBLIC_API_URL не задан — используем явный localhost (для server-side вызовов)
const API_BASE = `${envBase}/api`;

export const NextServer = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
