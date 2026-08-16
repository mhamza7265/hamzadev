import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamza Hanif | Full-Stack Engineer",
  description:
    "Full-stack web applications, scalable APIs, and cloud deployments.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hamza Hanif",
  url: "https://hamzahanif.dev",
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/mhamza7265",
    "https://linkedin.com/in/mhamza7265",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <body className="min-h-full flex flex-col">{children}</body>
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
          <PageViewTracker />
        </>
      )}
    </html>
  );
}
