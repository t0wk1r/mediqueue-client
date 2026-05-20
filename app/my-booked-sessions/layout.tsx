import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Booked Sessions",
};

export default function MyBookedSessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}