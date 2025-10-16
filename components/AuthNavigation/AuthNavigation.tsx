'use client';
import { logout } from '@/lib/clientApi';
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
 const handleLogout = async () => {
    await logout();

    clearIsAuthenticated();

    router.push('/sign-in');
 };

  return (
    <>
    { isAuthenticated ? (
<>
<li className={css.navigationItem}>
  <Link href="/profile" prefetch={false} className={css.navigationLink}>
    Profile
  </Link>
</li>

<li className={css.navigationItem}>
  <p className={css.userEmail}>{user?.email}</p>
  <button className={css.logoutButton} onClick={handleLogout}>
    Logout
  </button>
</li>
</>
): (
<>
<li className={css.navigationItem}>
  <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
    Login
  </Link>
</li>

<li className={css.navigationItem}>
  <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
    Sign up
  </Link>
</li>
</>
)}
    </>
  );
}
