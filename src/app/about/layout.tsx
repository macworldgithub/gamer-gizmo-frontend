import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | GamerGizmo",
  description:
    "Learn about GamerGizmo — our mission, values, and the team behind the platform.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About Us | GamerGizmo",
    description:
      "Learn about GamerGizmo — our mission, values, and the team behind the platform.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | GamerGizmo",
    description:
      "Learn about GamerGizmo — our mission, values, and the team behind the platform.",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


