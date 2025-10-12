// app/layout.tsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"], // какие начертания нужны
  subsets: ["latin", "cyrillic"], // можно оставить только "latin", если кириллица не нужна
  display: "swap",               // чтобы не было задержки при загрузке
  variable: "--font-roboto",     // создаст CSS-переменную для использования
});


export const metadata: Metadata = {
  title: "NoteHub – Create Note",
  description: "Create, organize and manage your notes easily with NoteHub.",
  openGraph: {
    title: "NoteHub – Create Note",
    description: "Create, organize and manage your notes easily with NoteHub.",
    url: "https://08-zustand-wg99.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
