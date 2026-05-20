import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <p className="font-semibold text-[var(--primary)]">Privacy Policy</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            How we protect your information
          </h1>

          <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-400">
            <Block
              title="Information We Collect"
              text="We collect basic account information such as name, email, photo URL, tutor details and booking information to provide the tutor booking service."
            />
            <Block
              title="How We Use Data"
              text="Your information is used to manage tutor profiles, session bookings, authentication and user-specific dashboard features."
            />
            <Block
              title="Data Security"
              text="Private routes are protected with JWT authentication. Users can only access their own tutors and booked sessions."
            />
            <Block
              title="Contact"
              text="For privacy-related questions, contact us at support@mediqueue.com."
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