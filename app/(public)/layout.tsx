import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamza Hanif | Full-Stack Engineer",
  description:
    "Full-stack web applications, scalable APIs, and cloud deployments.",
};

const PublicLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
          <PageViewTracker />
        </>
      )}
    </>
  );
};

export default PublicLayout;
