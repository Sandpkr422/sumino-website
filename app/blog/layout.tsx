import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Intelligence Blog | Medical & Caregiver Guides",
  description: "Browse clinically-adjudicated guides on managing hypertension, remote senior monitoring, pre-diabetes reversal, and child growth.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
