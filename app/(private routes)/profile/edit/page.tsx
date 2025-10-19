import { getServerMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProfileEditPageWrapper from "./EditProfilePage";

export const metadata: Metadata = {
  title: "Edit Profile – NoteHub",
  description: "Edit your profile information",
};

export default async function ProfileEditPage() {
  try {
    const user = await getServerMe();
    if (!user) return redirect("/sign-in");
    return <ProfileEditPageWrapper user={user} />;
  } catch {
    return redirect("/sign-in");
  }
}
