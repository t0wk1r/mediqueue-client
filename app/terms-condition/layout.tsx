import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Condition",
};

export default function TermsConditionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}