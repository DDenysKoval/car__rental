import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Car Rent Service",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manropeSans.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
