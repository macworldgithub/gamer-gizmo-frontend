import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Favourites | GamerGizmo",
  description: "Your favourite products on GamerGizmo.",
  alternates: { canonical: "/favourites" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Favourites | GamerGizmo",
    description: "Your favourite products on GamerGizmo.",
    url: "/favourites",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favourites | GamerGizmo",
    description: "Your favourite products on GamerGizmo.",
  },
};

export default function FavouritesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


