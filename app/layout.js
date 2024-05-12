import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import "../public/assets/css/reset.css";
import "../public/assets/css/fonts.css";
import "./globals.css";

import "../public/assets/css/responsive.css";

import Header from "../components/layout/Header"; 
import Footer from "../components/layout/Footer"; 
import Providers from "@/components/layout/Providers";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Accounter",
  description: "Accounter helps you for declaring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
        </body>
    </html>
  );
}
