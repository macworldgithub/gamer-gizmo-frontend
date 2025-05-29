import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // Import Script from next/script
import "./globals.css";
import StoreProvider from "../components/Store/StoreProvider";
import UiLayout from "./layout/UiLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // title: "Buy & Sell Gaming PCs, Laptops, Consoles & Components in UAE",
  title: "GamerGizmo: Buy & Sell Gaming PCs, Laptops, Consoles & Parts in UAE",
  description:
    "Looking to buy or sell gaming PCs, laptops, consoles, or components in UAE? Find the best deals on top brands and latest models. Shop now for great prices!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DRRX014LJC"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DRRX014LJC');
          `}
        </Script>

        {/* Google Ads Conversion Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-962702744"
        />
        <Script id="google-ads">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-962702744');
  `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Use next/script for the theme script */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function setThemeOnLoad() {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              })();
            `,
          }}
        />
        <ToastContainer
          hideProgressBar={false}
          autoClose={3000}
          progressClassName="progress-bar"
          position="top-right"
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <StoreProvider>
          <UiLayout>{children}</UiLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
