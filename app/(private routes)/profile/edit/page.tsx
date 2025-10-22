"use client";

import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [localUser, setLocalUser] = useState<User | null>(user);
  const [username, setUsername] = useState<string>(user?.username || "");

  // ✅ Коли компонент монтується — якщо немає користувача в Zustand, запитуємо через clientApi
  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          const me = await getMe();
          if (!me) router.push("/sign-in");
          setUser(me);
          setLocalUser(me);
          setUsername(me.username || "");
        }
      } catch {
        router.push("/sign-in");
      }
    })();
  }, [user, setUser, router]);

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUser = await updateMe({ username: username.trim() });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to update profile. Check console.");
    }
  };

  if (!localUser) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            localUser.avatar?.trim()
              ? localUser.avatar
              : "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {localUser.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
