import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Support & Inquiries",
  description: "Get in touch with SUMINO for general help, doctor panel verification, diagnostic laboratory integrations, and partnership proposals.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
