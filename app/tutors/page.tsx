"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {
  CalendarDays,
  Clock,
  MapPin,
  Monitor,
  Star
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Tutor = {
  _id: string;
  tutorName: string;
  photo: string;
  subject: string;
  location: string;
  teachingMode: string;
  hourlyFee: number;
  totalSlot: number;
  availableDays: string;
  availableTime: string;
  sessionDate: string;
};

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTutors = async (query = "") => {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors${query}`);
    const data = await res.json();

    setTutors(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const search = (form.search as HTMLInputElement).value;
    const startDate = (form.startDate as HTMLInputElement).value;
    const endDate = (form.endDate as HTMLInputElement).value;

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    fetchTutors(`?${params.toString()}`);
  };

  const formatDate = (date: string) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="font-semibold text-[var(--primary)]">Find Tutors</p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              Browse Available Tutors
            </h1>
          </div>

          <form
            onSubmit={handleSearch}
            className="mb-8 grid gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 md:grid-cols-4"
          >
            <input
              name="search"
              placeholder="Search tutor name"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
            />

            <input
              name="startDate"
              type="date"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
            />

            <input
              name="endDate"
              type="date"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
            />

            <button className="rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]">
              Search / Filter
            </button>
          </form>

          {loading ? (
            <p className="text-center text-slate-500">Loading tutors...</p>
          ) : tutors.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                No tutors found
              </h3>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <img
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-sm font-medium text-[var(--primary)]">
                        {tutor.subject}
                      </span>

                      
                      <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-600">
                      <Star size={14} fill="currentColor" />
                      4.9
                    </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {tutor.tutorName}
                    </h3>

                    <div className="mt-3 grid gap-3 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <MapPin
                            size={16}
                            className="shrink-0 text-[var(--primary)]"
                          />
                          <span>{tutor.location}</span>
                        </p>

                        <p className="flex items-center gap-2">
                          <Monitor
                            size={16}
                            className="shrink-0 text-[var(--primary)]"
                          />
                          <span>{tutor.teachingMode}</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="flex items-start gap-2">
                          <Clock
                            size={16}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                          />
                          <span>
                            {tutor.availableDays} - {tutor.availableTime}
                          </span>
                        </p>

                        <p className="flex items-start gap-2">
                          <CalendarDays
                            size={16}
                            className="mt-0.5 shrink-0 text-[var(--primary)]"
                          />
                          <span>{formatDate(tutor.sessionDate)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        ৳{tutor.hourlyFee}
                        <span className="text-sm font-normal text-slate-500">
                          /hour
                        </span>
                      </p>

                      <span className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                        {tutor.totalSlot} slots
                      </span>
                    </div>

                    <Link
                      href={`/tutors/${tutor._id}`}
                      className="mt-5 block rounded-xl bg-[var(--primary)] px-4 py-3 text-center font-semibold text-white hover:bg-[var(--primary-hover)]"
                    >
                      Book Session
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}