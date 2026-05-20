import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div>
            <p className="font-semibold text-[var(--primary)]">Contact Us</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Have questions about tutor booking, session management or tutor
              profiles? Send us a message.
            </p>

            <div className="mt-8 space-y-4">
              <Info icon={Mail} title="Email" text="support@mediqueue.com" />
              <Info icon={Phone} title="Phone" text="+880 1700-000000" />
              <Info icon={MapPin} title="Address" text="Rajshahi, Bangladesh" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <form className="space-y-4">
              <input
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
              />
              <textarea
                rows={5}
                placeholder="Your message"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-800"
              ></textarea>

              <button
                type="button"
                className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Info({ icon: Icon, title, text }: any) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <Icon className="text-[var(--primary)]" size={26} />
      <div>
        <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{text}</p>
      </div>
    </div>
  );
}