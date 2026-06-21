import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Opportunities & Scaling Health Economics",
  description: "Explore the health economics of moving Indian healthcare into the home. Partner with SUMINO to scale preventive wellness.",
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
