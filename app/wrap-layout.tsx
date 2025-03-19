"use client";
import clsx from "clsx";
import Providers from "./providers";
import { usePathname } from "next/navigation";
import Header from "./components/common/Header";
import WalletConnectModal from "./components/common/WalletConnectModal";
import Footer from "./components/common/Footer";

export default function WrapLayout({ children }) {
  const pathname = usePathname();

  return (
    <Providers>
      <div
        className={clsx(
          "h-screen flex flex-col overflow-auto",
          pathname === "/playground" ? "bg-[#1f2935]" : "bg-[#F6F6F3]"
        )}
      >
        {pathname !== "/playground" && <Header />}
        <div className="grow max-w-view px-4 mx-auto w-full flex flex-col">
          {children}
        </div>
        {pathname !== "/playground" && <Footer />}
        <WalletConnectModal />
      </div>
    </Providers>
  );
}
