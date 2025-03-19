"use client";
import clsx from "clsx";
import Providers from "../providers";

export default function Layout({ children }) {
  return (
    <Providers>
      <div
        className={clsx("h-screen flex flex-col overflow-auto bg-[#1b202c]")}
      >
        <div className="grow max-w-view px-4 mx-auto w-full flex flex-col">
          {children}
        </div>
      </div>
    </Providers>
  );
}
