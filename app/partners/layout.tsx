import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate, Hospital & Diagnostic Partnerships",
  description: "Integrate diagnostic test reports directly into patient dashboards and partner with SUMINO to build the prevention economy.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
