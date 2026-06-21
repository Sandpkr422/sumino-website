import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Mission & Story",
  description: "SUMINO was founded to shift Indian healthcare into the home. Read our founder's story and discover our commitment to family health security.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
