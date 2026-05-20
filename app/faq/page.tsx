import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const faqs = [
  {
    q: "How can I book a tutor?",
    a: "Login to your account, visit the Tutors page, open a tutor details page and click Book Session.",
  },
  {
    q: "Can I add my own tutor profile?",
    a: "Yes. After login, you can use the Add Tutor page to create a tutor profile.",
  },
  {
    q: "What happens when a session is booked?",
    a: "The system automatically decreases the tutor available slot by one.",
  },
  {
    q: "Can I cancel a booked session?",
    a: "Yes. Go to My Booked Sessions and click Cancel. The booking status will be updated to cancelled.",
  },
  {
    q: "Does MediQueue support online and offline tutors?",
    a: "Yes. Tutors can select Online, Offline or Both as their teaching mode.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-semibold text-[var(--primary)]">FAQ</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900"
              >
                <summary className="cursor-pointer font-bold text-slate-900 dark:text-white">
                  {faq.q}
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}