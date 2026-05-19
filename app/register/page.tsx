"use client";

import SocialLogin from "@/components/shared/SocialLogin";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function RegisterPage() {
    const { registerUser } = useAuth();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const passwordRules = useMemo(
        () => [
            {
                label: "At least 6 characters",
                valid: password.length >= 6,
            },
            {
                label: "At least 1 number",
                valid: /[0-9]/.test(password),
            },
            {
                label: "At least 1 lowercase letter",
                valid: /[a-z]/.test(password),
            },
            {
                label: "At least 1 uppercase letter",
                valid: /[A-Z]/.test(password),
            },
        ],
        [password]
    );

    const passwordStrength =
        (passwordRules.filter((rule) => rule.valid).length / passwordRules.length) *
        100;

    const isPasswordValid = passwordRules.every((rule) => rule.valid);

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isPasswordValid) {
            toast.error("Please follow all password rules");
            return;
        }

        const form = e.currentTarget;

        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const photoURL = (form.elements.namedItem("photoURL") as HTMLInputElement)
            .value;

        try {
            const result = await registerUser(email, password);

            await updateProfile(result.user, {
                displayName: name,
                photoURL,
            });

            toast.success("Registration successful");
            router.push("/login");
        } catch {
            toast.error("Registration failed");
        }
    };

    return (

        <>
            <Navbar />
            <main className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950">
                <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-md items-center">
                    <div className="w-full rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
                        <h1 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
                            Register
                        </h1>

                        <form onSubmit={handleRegister} className="mt-6 space-y-3">
                            <input
                                name="name"
                                required
                                placeholder="Name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                            <input
                                name="photoURL"
                                type="url"
                                required
                                placeholder="Photo URL"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                                {password && (
                                    <div className="mt-3">
                                        <div className="h-1 w-full rounded-full bg-[var(--muted)]">
                                            <div
                                                className="h-1 rounded-full bg-[var(--primary)] transition-all duration-300"
                                                style={{ width: `${passwordStrength}%` }}
                                            />
                                        </div>

                                        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {passwordStrength < 50
                                                ? "Weak password. Must contain:"
                                                : passwordStrength < 100
                                                    ? "Good password. Must contain:"
                                                    : "Strong password"}
                                        </p>

                                        <div className="mt-2 space-y-1 text-sm">
                                            {passwordRules.map((rule) => (
                                                <div key={rule.label} className="flex items-center gap-2">
                                                    <span
                                                        className={
                                                            rule.valid
                                                                ? "text-[var(--primary)]"
                                                                : "text-slate-400"
                                                        }
                                                    >
                                                        {rule.valid ? "✓" : "×"}
                                                    </span>

                                                    <span
                                                        className={
                                                            rule.valid
                                                                ? "text-[var(--primary)]"
                                                                : "text-slate-500 dark:text-slate-400"
                                                        }
                                                    >
                                                        {rule.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                            >
                                Register
                            </button>
                        </form>

                        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-[var(--primary)]">
                                Login
                            </Link>
                        </p>

                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                            <span className="text-sm text-slate-400">Or</span>
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                        </div>

                        <SocialLogin />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}