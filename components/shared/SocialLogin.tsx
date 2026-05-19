"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SocialLogin({
  redirectPath = "/",
}: {
  redirectPath?: string;
}) {
  const { googleLogin } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful");
      router.push(redirectPath);
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      Continue with Google
    </button>
  );
}