import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banff & Vancouver 2026",
  description: "10-day road trip from Ottawa to Banff and Vancouver. Summer 2026.",
};

export default function BanffTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
