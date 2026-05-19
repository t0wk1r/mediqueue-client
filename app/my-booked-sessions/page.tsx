"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import axiosSecure from "@/lib/axiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Booking = {
  _id: string;
  tutorName: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  status: string;
};

export default function MyBookedSessionsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axiosSecure.get("/my-bookings");
      setBookings(res.data.data || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const res = await axiosSecure.patch(`/bookings/${id}/cancel`);

      if (res.data.success) {
        toast.success("Booking cancelled successfully");

        setBookings((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: "cancelled" } : item
          )
        );
      }
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="font-semibold text-[var(--primary)]">
              My Booked Sessions
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              My Learning Sessions
            </h1>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm dark:bg-slate-900">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-[var(--primary-light)] dark:bg-slate-800">
                <tr>
                  <th className="p-4">Tutor Name</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500">
                      No bookings available.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="p-4 font-semibold">{booking.tutorName}</td>
                      <td className="p-4">{booking.studentName}</td>
                      <td className="p-4">{booking.studentEmail}</td>
                      <td className="p-4">{booking.phone}</td>
                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            booking.status === "cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-[var(--primary-light)] text-[var(--primary)]"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={booking.status === "cancelled"}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}