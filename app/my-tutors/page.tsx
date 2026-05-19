"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import axiosSecure from "@/lib/axiosSecure";
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
};

export default function MyTutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [deleteTutor, setDeleteTutor] = useState<Tutor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(tutors.length / itemsPerPage);

  const paginatedTutors = tutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchMyTutors = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/my-tutors");
      setTutors(res.data.data || []);
    } catch {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleUpdateTutor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedTutor) return;

    const form = e.currentTarget;

    const updatedData = {
      tutorName: (form.tutorName as HTMLInputElement).value,
      photo: (form.photo as HTMLInputElement).value,
      subject: (form.subject as HTMLSelectElement).value,
      availableDays: (form.availableDays as HTMLInputElement).value,
      availableTime: (form.availableTime as HTMLInputElement).value,
      hourlyFee: Number((form.hourlyFee as HTMLInputElement).value),
      totalSlot: Number((form.totalSlot as HTMLInputElement).value),
      sessionDate: (form.sessionDate as HTMLInputElement).value,
      institution: (form.institution as HTMLInputElement).value,
      experience: (form.experience as HTMLInputElement).value,
      location: (form.location as HTMLInputElement).value,
      teachingMode: (form.teachingMode as HTMLSelectElement).value,
    };

    try {
      const res = await axiosSecure.patch(
        `/tutors/${selectedTutor._id}`,
        updatedData
      );

      if (res.data.success) {
        toast.success("Tutor updated successfully");

        setTutors((prev) =>
          prev.map((item) =>
            item._id === selectedTutor._id ? { ...item, ...updatedData } : item
          )
        );

        setSelectedTutor(null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update tutor");
    }
  };

  const handleDeleteTutor = async () => {
    if (!deleteTutor) return;

    try {
      const res = await axiosSecure.delete(`/tutors/${deleteTutor._id}`);

      if (res.data.success) {
        toast.success("Tutor deleted successfully");
        setTutors((prev) =>
          prev.filter((item) => item._id !== deleteTutor._id)
        );
        setDeleteTutor(null);
      }
    } catch {
      toast.error("Failed to delete tutor");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="font-semibold text-[var(--primary)]">My Tutors</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              Tutors Created By Me
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Update or delete your created tutors from here.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="bg-[var(--primary-light)] text-sm text-slate-900 dark:bg-slate-800 dark:text-white">
                  <th className="px-5 py-4">Photo</th>
                  <th className="px-5 py-4">Tutor Name</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Slot</th>
                  <th className="px-5 py-4">Mode</th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      Loading tutors...
                    </td>
                  </tr>
                ) : tutors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No tutors available yet.
                    </td>
                  </tr>
                ) : (
                  paginatedTutors.map((tutor) => (
                    <tr
                      key={tutor._id}
                      className="border-t border-slate-100 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                    >
                      <td className="px-5 py-4">
                        <img
                          src={tutor.photo}
                          alt={tutor.tutorName}
                          className="h-14 w-14 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                        />
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {tutor.tutorName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {tutor.location}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                          {tutor.subject}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                        ৳{tutor.hourlyFee}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {tutor.totalSlot}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {tutor.teachingMode}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedTutor(tutor)}
                            className="rounded-lg bg-[var(--primary-light)] px-4 py-2 text-xs font-semibold text-[var(--primary)] hover:bg-[var(--primary-soft)]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => setDeleteTutor(tutor)}
                            className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {tutors.length > 10 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${currentPage === page
                        ? "bg-[var(--primary)] text-white"
                        : "border border-slate-300 dark:border-slate-700"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {selectedTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--primary)]">
                    Update Tutor
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    Edit {selectedTutor.tutorName}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedTutor(null)}
                  className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateTutor} className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Tutor Name"
                  name="tutorName"
                  defaultValue={selectedTutor.tutorName}
                />

                <Input
                  label="Photo URL"
                  name="photo"
                  type="url"
                  defaultValue={selectedTutor.photo}
                />

                <Select
                  label="Subject / Category"
                  name="subject"
                  defaultValue={selectedTutor.subject}
                  options={[
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "English",
                    "ICT",
                    "Biology",
                  ]}
                />

                <Input
                  label="Available Days"
                  name="availableDays"
                  defaultValue={selectedTutor.availableDays}
                />

                <Input
                  label="Available Time Slot"
                  name="availableTime"
                  defaultValue={selectedTutor.availableTime}
                />

                <Input
                  label="Hourly Fee"
                  name="hourlyFee"
                  type="number"
                  defaultValue={String(selectedTutor.hourlyFee)}
                />

                <Input
                  label="Total Slot"
                  name="totalSlot"
                  type="number"
                  defaultValue={String(selectedTutor.totalSlot)}
                />

                <Input
                  label="Session Start Date"
                  name="sessionDate"
                  type="date"
                  defaultValue={selectedTutor.sessionDate}
                />

                <Input
                  label="Institution"
                  name="institution"
                  defaultValue={selectedTutor.institution}
                />

                <Input
                  label="Experience"
                  name="experience"
                  defaultValue={selectedTutor.experience}
                />

                <Input
                  label="Location"
                  name="location"
                  defaultValue={selectedTutor.location}
                />

                <Select
                  label="Teaching Mode"
                  name="teachingMode"
                  defaultValue={selectedTutor.teachingMode}
                  options={["Online", "Offline", "Both"]}
                />

                <div className="flex gap-3 md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTutor(null)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold dark:border-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteTutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-slate-900">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Delete Tutor?
              </h2>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {deleteTutor.tutorName}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteTutor(null)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold dark:border-slate-700"
                >
                  No, Keep It
                </button>

                <button
                  onClick={handleDeleteTutor}
                  className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </ProtectedRoute>
  );
}

function Input({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`edit-${name}`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={`edit-${name}`}
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <div>
      <label
        htmlFor={`edit-${name}`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <select
        id={`edit-${name}`}
        name={name}
        required
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}