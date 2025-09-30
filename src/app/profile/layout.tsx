import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Profile | GamerGizmo",
  description: "Manage your GamerGizmo profile, preferences, and account settings.",
  alternates: { canonical: "/profile" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "My Profile | GamerGizmo",
    description:
      "Manage your GamerGizmo profile, preferences, and account settings.",
    url: "/profile",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Profile | GamerGizmo",
    description:
      "Manage your GamerGizmo profile, preferences, and account settings.",
  },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


