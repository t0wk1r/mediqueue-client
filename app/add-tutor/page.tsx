"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useAuth from "@/hooks/useAuth";
import axiosSecure from "@/lib/axiosSecure";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function AddTutorPage() {
  const { user } = useAuth();

  const handleAddTutor = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const tutorData = {
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
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const res = await axiosSecure.post("/tutors", tutorData);

      if (res.data.success) {
        toast.success("Tutor added successfully");
        form.reset();
      }
    } catch {
      toast.error("Failed to add tutor");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <section className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:p-8">
          <p className="font-semibold text-[var(--primary)]">Add Tutor</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            Create a Tutor Profile
          </h1>

          <form onSubmit={handleAddTutor} className="mt-8 grid gap-5 md:grid-cols-2">
            <Input label="Tutor Name" name="tutorName" placeholder="Enter tutor name" />
            <Input label="Photo URL" name="photo" type="url" placeholder="Enter photo URL" />

            <Select
              label="Subject / Category"
              name="subject"
              options={["Mathematics", "Physics", "Chemistry", "English", "ICT", "Biology"]}
            />

            <Input
              label="Available Days"
              name="availableDays"
              placeholder="e.g. Sun - Thu"
            />

            <Input
              label="Available Time Slot"
              name="availableTime"
              placeholder="e.g. 5:00 PM - 8:00 PM"
            />

            <Input
              label="Hourly Fee"
              name="hourlyFee"
              type="number"
              placeholder="Enter hourly fee"
            />

            <Input
              label="Total Slot"
              name="totalSlot"
              type="number"
              placeholder="Enter total slot"
            />

            <Input
              label="Session Start Date"
              name="sessionDate"
              type="date"
              placeholder="Select session date"
            />

            <Input
              label="Institution"
              name="institution"
              placeholder="Enter institution name"
            />

            <Input
              label="Experience"
              name="experience"
              placeholder="e.g. 3 years"
            />

            <Input
              label="Location"
              name="location"
              placeholder="Area / City"
            />

            <Select
              label="Teaching Mode"
              name="teachingMode"
              options={["Online", "Offline", "Both"]}
            />

            <button
              type="submit"
              className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--primary-hover)] md:col-span-2"
            >
              Submit Tutor
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}

function Input({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <option value="">Select {label}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}