import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "A simple weather app ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
