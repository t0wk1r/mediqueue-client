import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function TermsConditionPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="font-semibold text-[var(--primary)]">
            Terms & Conditions
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            Terms for using MediQueue
          </h1>

          <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-400">
            <Block
              title="User Account"
              text="Users are responsible for maintaining correct login information and using the platform respectfully."
            />
            <Block
              title="Tutor Profile"
              text="Users who create tutor profiles should provide accurate subject, availability, fee, slot and teaching mode information."
            />
            <Block
              title="Booking Sessions"
              text="Students can book available tutor sessions. Once a booking is completed, the tutor slot will decrease automatically."
            />
            <Block
              title="Cancellation"
              text="Users can cancel their booked sessions from the My Booked Sessions page. The booking status will be updated to cancelled."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2">{text}</p>
    </div>
  );
}