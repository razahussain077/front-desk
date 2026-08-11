import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftLabor | AI Front Desk",
  description: "AI Front Desk & Booking Employee for HVAC businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
