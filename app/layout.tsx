import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import ThemeProvider from "@/components/shared/ThemeProvider";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: {
    default: "MediQueue",
    template: "%s | MediQueue",
  },
  description: "Tutor Booking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}