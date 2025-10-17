"use client";

import { updateMe } from "@/lib/clientApi";
import { User } from "@/types/user";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";

interface ProfileEditPageProps {
  user: User;
}

export default function ProfileEditPageWrapper({ user }: ProfileEditPageProps) {
  const router = useRouter();

  const [username, setUsername] = useState<string>(user.username || "");
  const [avatar, setAvatar] = useState<string>(
    user.avatar && user.avatar.trim() !== ""
      ? user.avatar
      : "https://ac.goit.global/fullstack/react/default-avatar.jpg"
  );

  useEffect(() => {
    setUsername(user.username || "");
    setAvatar(user.avatar || "/avatar.png");
  }, [user]);

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const payload = {
      username: username.trim(), // только username
    };
    await updateMe(payload);

    router.back();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    alert("Failed to update profile. Check console.");
  }
};

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className={css.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
