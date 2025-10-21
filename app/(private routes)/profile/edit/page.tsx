"use client";

import { updateMe } from "@/lib/api/clientApi";
import { getServerMe } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";

export default function ProfileEditPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const me = await getServerMe();
        if (!me) router.push("/sign-in");
        setLocalUser(me);
        setUsername(me.username || "");
      } catch {
        router.push("/sign-in");
      }
    })();
  }, [router]);

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

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user.avatar?.trim()
              ? user.avatar
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

          <p>Email: {user.email}</p>

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
