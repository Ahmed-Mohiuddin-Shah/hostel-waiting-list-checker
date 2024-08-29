import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

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
          className="h-screen bg-cover bg-center text-white"
        >
          {children}
        </div>
        <div className=""></div>
      </body>
    </html>
  );
}
