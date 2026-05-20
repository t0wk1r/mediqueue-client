import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become A Tutor",
};

export default function BecomeTutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}