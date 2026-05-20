"use client";

import useAuth from "@/hooks/useAuth";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Tutors", href: "/tutors" },
];

const privateLinks = [
  { label: "Add Tutor", href: "/add-tutor" },
  { label: "My Tutors", href: "/my-tutors" },
  { label: "My Booked Sessions", href: "/my-booked-sessions" },
];

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logout successful");
    setProfileOpen(false);
    router.push("/login");
  };

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === href
      ? "bg-[var(--primary-light)] text-[var(--primary)]"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
    }`;

  const allLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
          MediQueue
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {allLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-white"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-lg px-4 py-2 font-medium text-slate-700 dark:text-slate-200">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 font-medium text-white hover:bg-[var(--primary-hover)]"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <img
                  src={user.photoURL || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-[var(--primary)] object-cover"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {user.displayName || "User"}
                  </p>
                  <p className="mb-3 truncate text-sm text-slate-500">
                    {user.email}
                  </p>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-white"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="space-y-2">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <>
                <Link href="/login" className="block rounded-lg px-3 py-2 dark:text-white">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg bg-[var(--primary)] px-3 py-2 text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 py-2 text-left text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}