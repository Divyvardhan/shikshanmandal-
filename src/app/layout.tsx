import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://shikshanmandal.com"),
  title: {
    default: "Shikshan Mandal | Global Intellectual Property Consultancy",
    template: "%s | Shikshan Mandal",
  },
  description:
    "Shikshan Mandal is a premium Intellectual Property consultancy for patent registration, design registration, copyright, publication support, and global IP filing.",
  keywords: [
    "Shikshan Mandal",
    "Intellectual Property consultancy",
    "Patent Registration",
    "Copyright",
    "Industrial Design",
    "IP Strategy",
    "Global IP Filing",
  ],
  openGraph: {
    title: "Shikshan Mandal | Global Intellectual Property Consultancy",
    description: "Premium IP registration, protection, publication support, and global filing services.",
    url: "/",
    siteName: "Shikshan Mandal",
    images: [{ url: "/brand/shikshan-mandal-logo-official-2026.jpeg", width: 1006, height: 1103, alt: "Shikshan Mandal official logo" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shikshan Mandal | Global Intellectual Property Consultancy",
    description: "Patent, design, copyright, publication support, and global IP filing.",
    images: ["/brand/shikshan-mandal-logo-official-2026.jpeg"],
  },
  icons: {
    icon: "/brand/shikshan-mandal-logo-official-2026.jpeg",
    apple: "/brand/shikshan-mandal-logo-official-2026.jpeg",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
