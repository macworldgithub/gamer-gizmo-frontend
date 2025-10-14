import { ReactNode } from "react";

export const metadata = {
  title: "Book your PC Inspection Service in the UAE | GamerGizmo",
  description:
    "Book a PC inspection in UAE with GamerGizmo. Get a certified health report, detailed performance check, and buy & sell your computer with full confidence.",
  alternates: { canonical: "https://gamergizmo.com/Inspection" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Book your PC Inspection Service in the UAE | GamerGizmo",
    description:
      "Book a PC inspection in UAE with GamerGizmo. Get a certified health report, detailed performance check, and buy & sell your computer with full confidence.",
    url: "https://gamergizmo.com/Inspection",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book your PC Inspection Service in the UAE | GamerGizmo",
    description:
      "Book a PC inspection in UAE with GamerGizmo. Get a certified health report, detailed performance check, and buy & sell your computer with full confidence.",
  },
};

export default function InspectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
