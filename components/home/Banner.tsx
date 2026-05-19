"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Find Expert Tutors for Every Subject",
    desc: "Browse tutors by subject, teaching mode, location and available time slots.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
  },
  {
    title: "Book Learning Sessions Easily",
    desc: "No manual scheduling. Choose a tutor, check slots and book your session online.",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200",
  },
  {
    title: "Online and Offline Tutor Support",
    desc: "Learn the way you want with online, offline or both teaching modes.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
  },
];

export default function Banner() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <style>
        {`
          .mediqueue-banner .swiper-pagination-bullet {
            background: var(--primary);
            opacity: 0.35;
            width: 10px;
            height: 10px;
          }

          .mediqueue-banner .swiper-pagination-bullet-active {
            background: var(--primary);
            opacity: 1;
            width: 28px;
            border-radius: 999px;
          }
        `}
      </style>

      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          className="mediqueue-banner overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="grid min-h-[500px] items-center gap-10 bg-[var(--primary-light)] px-6 py-12 pb-16 dark:bg-slate-900 md:grid-cols-2 md:px-20 lg:px-28">
                <div>
                  <p className="mb-3 font-semibold text-[var(--primary)]">
                    MediQueue Tutor Booking
                  </p>

                  <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                    {slide.desc}
                  </p>

                  <Link
                    href="/tutors"
                    className="mt-8 inline-block rounded-xl bg-[var(--primary)] px-7 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
                  >
                    Browse Tutors
                  </Link>
                </div>

                <div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-[360px] w-full rounded-3xl object-cover shadow-2xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}