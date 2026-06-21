import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For General Physicians & Specialists | Clinical Partnering",
  description: "Access clean, patient-authorized longitudinal timelines of home vitals and clinical summaries to save time and make informed decisions.",
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
