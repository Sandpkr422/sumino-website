import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How SUMINO Works | Preventive Family Health Platform",
  description: "Understand how SUMINO monitors home vital trends, sleep parameters, and chronic symptoms using ethical AI models to catch risks early.",
};

export default function SolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
