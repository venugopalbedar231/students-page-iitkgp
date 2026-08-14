import type { Metadata } from "next";
import { Inter, Lexend, Public_Sans } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-lexend",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-public-sans",
});

export const metadata: Metadata = {
  title: "IIT Kharagpur | Students",
  description: "Redesigned students page for IIT Kharagpur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexend.variable} ${publicSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/x-icon" href="https://www.iitkgp.ac.in/assets/img/favicon.png" />
      </head>
      <body className="min-h-full flex flex-col font-inter bg-[#fafafa] text-[#1a1a1a]">{children}</body>
    </html>
  );
}

