"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import SocialLogin from "@/components/shared/SocialLogin";
import useAuth from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await loginUser(email, password);
      toast.success("Login successful");
      router.push(redirectPath);
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950">
        <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-md items-center">
          <div className="w-full rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h1 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
              Login
            </h1>

            <form onSubmit={handleLogin} className="mt-6 space-y-3">
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="text-right text-sm text-slate-500 dark:text-slate-400">
                Forget password?
              </p>

              <button
                type="submit"
                className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(redirectPath)}`}
                className="font-semibold text-[var(--primary)]"
              >
                Register
              </Link>
            </p>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-sm text-slate-400">Or</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <SocialLogin redirectPath={redirectPath} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}