import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutors",
};

export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}