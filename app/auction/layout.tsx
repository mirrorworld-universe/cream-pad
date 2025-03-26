"use client";
import clsx from "clsx";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Providers from "../providers";
import WalletConnectModal from "../components/common/WalletConnectModal";

export default function Layout({ children }) {
  return (
    <Providers>
      <div
        className={clsx(
          "h-screen flex flex-col overflow-auto bg-[#F6F6F3] relative"
        )}
      >
        <Header />

        <div className="grow flex flex-col">{children}</div>
        <Footer />
        <WalletConnectModal />
      </div>
    </Providers>
  );
}
