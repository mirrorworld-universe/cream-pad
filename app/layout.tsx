import type { Metadata } from "next";
import { Manrope, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/common/Header";
import SonicFooter from "./components/common/SonicFooter";
import WalletConnectModal from "./components/common/WalletConnectModal";

export const metadata: Metadata = {
  title:
    "Cream Pad: Transforming Token Launches with Dutch Dual-Track Auctions",
  icons: {
    icon: "https://storage.sonic.game/strapi/production/favicon_e0c81c06c9.ico"
  },
  description:
    "Cream Pad is a cutting-edge asset launchpad on Sonic SVM, redefining token distribution with its Dutch Dual-Track Auction."
};

const manrope = Manrope({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope"
});

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="app" className={`${manrope.variable} ${orbitron.variable}`}>
        <Providers>
          <div className="bg-[#1f2935] h-screen flex flex-col overflow-auto">
            {/* <Header /> */}
            <div className="grow max-w-view px-4 mx-auto w-full flex flex-col">
              {children}
            </div>
            {/* <WalletConnectModal /> */}
            {/* <SonicFooter /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
