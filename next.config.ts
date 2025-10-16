import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   turbopack: {
    root: __dirname,
  },
images: {
    domains: [
      "ac.goit.global", // 👈 добавили домен с твоей ошибкой
      "zastavki.gas-kvas.com", // если ты используешь аватар оттуда
      "localhost", // если локальные API или статика
    ],
  },
};

export default nextConfig;

