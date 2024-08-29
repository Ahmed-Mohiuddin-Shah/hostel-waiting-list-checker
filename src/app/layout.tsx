import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./background.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostel Waiting List",
  description: "Check Your Hostel Waiting List Position",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <div
          style={{ backgroundImage: `url(/background.jpg)` }}
          className="h-screen bg-cover bg-center text-white border-b-8 border-b-solid border-b-slate-400"
        >
          {children}
        </div>
        <div className=""></div>
      </body>
    </html>
  );
}
