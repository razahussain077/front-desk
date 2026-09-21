import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://swiftlabor.ai"),
  title: {
    default: "SwiftLabor.ai — Purpose-built digital workers",
    template: "%s — SwiftLabor.ai",
  },
  description:
    "SwiftLabor builds purpose-built digital workers for repetitive business operations — calls, research, documents, follow-ups and handoffs.",
  openGraph: {
    title: "SwiftLabor.ai — Purpose-built digital workers",
    description:
      "Digital workers for repetitive business operations.",
    url: "https://swiftlabor.ai/",
    siteName: "SwiftLabor.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftLabor.ai — Purpose-built digital workers",
    description:
      "Digital workers for repetitive business operations.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
