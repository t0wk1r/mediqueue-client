"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="User"
            className="mx-auto h-28 w-28 rounded-full border-4 border-[var(--primary)] object-cover"
          />

          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            {user?.displayName || "User"}
          </h1>

          <p className="mt-2 text-slate-500">{user?.email}</p>

          <div className="mt-8 rounded-2xl bg-[var(--primary-light)] p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Welcome to your MediQueue profile. You can manage tutors and
              booked sessions from the dashboard menu.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}