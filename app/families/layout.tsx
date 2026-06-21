import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preventive Care for Families & Caregivers",
  description: "Proactive tracking tools for senior parents, child growth milestones, and chronic conditions to protect your family's health parameters.",
};

export default function FamiliesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
