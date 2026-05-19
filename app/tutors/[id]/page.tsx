"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Tutor = {
  _id: string;
  tutorName: string;
  photo: string;
  subject: string;
  availableDays: string;
  availableTime: string;
  hourlyFee: number;
  totalSlot: number;
  sessionDate: string;
  institution: string;
  experience: string;
  location: string;
  teachingMode: string;
  createdByEmail?: string;
  createdByName?: string;
};

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
  async function fetchTutor() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`
      );

      const data = await res.json();
      const tutorData = data?.data || null;

      setTutor(tutorData);

      if (tutorData?._id && user?.email) {
        try {
          const checkRes = await axiosSecure.get(
            `/bookings/check/${tutorData._id}`
          );

          setAlreadyBooked(checkRes.data.alreadyBooked);
        } catch {
          setAlreadyBooked(false);
        }
      }
    } catch {
      setTutor(null);
    } finally {
      setLoading(false);
    }
  }

  if (id) fetchTutor();
}, [id, user?.email]);

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tutor) return;

    if (alreadyBooked) {
      toast.error("You have already booked this tutor");
      return;
    }

    if (tutor.totalSlot <= 0) {
      toast.error("This session is fully booked. You can’t join at the moment.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (today < tutor.sessionDate) {
      toast.error("Booking is not available yet for this tutor");
      return;
    }

    const form = e.currentTarget;

    const bookingData = {
      tutorId: tutor._id,
      studentName: (form.studentName as HTMLInputElement).value,
      phone: (form.phone as HTMLInputElement).value,
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.success) {
        toast.success("Session booked successfully");
        setAlreadyBooked(true);
        setBookingOpen(false);
        router.push("/my-booked-sessions");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to book session");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        {loading ? (
          <p className="text-center text-slate-500">Loading tutor...</p>
        ) : !tutor ? (
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center dark:bg-slate-900">
            <h1 className="text-2xl font-bold dark:text-white">
              Tutor not found
            </h1>
          </div>
        ) : (
          <section className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:grid-cols-2">
            <img
              src={tutor.photo}
              alt={tutor.tutorName}
              className="h-[460px] w-full rounded-2xl object-cover"
            />

            <div>
              <span className="rounded-full bg-[var(--primary-light)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
                {tutor.subject}
              </span>

              <h1 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
                {tutor.tutorName}
              </h1>

              <p className="mt-4 text-slate-600 dark:text-slate-400">
                {tutor.institution} • {tutor.experience}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Info label="Tutor Name" value={tutor.tutorName} />
                <Info label="Subject / Category" value={tutor.subject} />
                <Info label="Hourly Fee" value={`৳${tutor.hourlyFee}`} />
                <Info label="Total Slot" value={String(tutor.totalSlot)} />
                <Info label="Available Days" value={tutor.availableDays} />
                <Info label="Available Time Slot" value={tutor.availableTime} />
                <Info label="Session Start Date" value={tutor.sessionDate} />
                <Info label="Institution" value={tutor.institution} />
                <Info label="Experience" value={tutor.experience} />
                <Info label="Location" value={tutor.location} />
                <Info label="Teaching Mode" value={tutor.teachingMode} />
              </div>

              <button
                onClick={() => {
                  if (alreadyBooked) return;
                  setBookingOpen(true);
                }}
                disabled={tutor.totalSlot <= 0 || alreadyBooked}
                className="mt-8 w-full rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {alreadyBooked
                  ? "You Are Already Booked This Tutor"
                  : tutor.totalSlot <= 0
                  ? "No available slots left"
                  : "Book Session"}
              </button>
            </div>
          </section>
        )}

        {bookingOpen && tutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Book Session
              </h2>

              <form onSubmit={handleBooking} className="mt-5 space-y-4">
                <input
                  name="studentName"
                  required
                  defaultValue={user?.displayName || ""}
                  placeholder="Student Name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
                />

                <input
                  name="phone"
                  required
                  placeholder="Phone"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
                />

                <input
                  value={tutor._id}
                  readOnly
                  type="hidden"
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                />

                <input
                  value={tutor.tutorName}
                  readOnly
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                />

                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(false)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold dark:border-slate-700"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </ProtectedRoute>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  );
}