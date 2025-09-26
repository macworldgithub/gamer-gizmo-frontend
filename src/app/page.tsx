import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Buy & Sell Gaming PCs, Laptops, Consoles & Parts in UAE | GamerGizmo",
  description:
    "Looking to buy or sell gaming PCs, laptops, consoles, or components in the UAE? Find the best deals on top brands and latest models. Shop now for great prices!",
};
export default function HomePage() {
  return <HomePageClient />;
}
