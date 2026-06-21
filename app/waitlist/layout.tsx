import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Beta Waitlist | Early Access",
  description: "Secure early batch access to SUMINO in your city. Take control of your household health indicators and schedule consultations.",
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
