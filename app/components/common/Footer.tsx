import { cn } from "@/utils";

export default function Footer() {
  return (
    <div
      className={cn(
        "bg-[#121212] text-white px-[70px] pb-10 pt-[60px] rounded-t-[50px] flex flex-col gap-8"
      )}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-9">
          <img className="h-10" src="/images/footer-logo.png" alt="logo" />
          <div className="flex items-center gap-3">
            <img
              className="size-12 cursor-pointer"
              src="/images/footer-x.svg"
              alt="x"
            />
            <img
              className="size-12 cursor-pointer"
              src="/images/footer-tg.svg"
              alt="telegram"
            />
          </div>
        </div>
        <div className="flex gap-[100px]">
          <div className="flex flex-col gap-4 text-sm">
            <p className="font-baloo2 text-2xl/[1.2] font-bold mb-1">
              Products
            </p>
            <a href="#">Auction</a>
            <a href="#">AI Agent</a>
            <a href="#">BounceX Exchange</a>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <p className="font-baloo2 text-2xl/[1.2] font-bold mb-1">
              Resources
            </p>
            <a href="#">Help Center</a>
            <a href="#">Become a Partner</a>
            <a href="#">Contract Us</a>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/20"></div>

      <div className="flex justify-between items-center">
        <span>
          ©{new Date().getFullYear()} Cream PAD Ltd. All rights reserved.
        </span>
        <div className="flex gap-10 text-sm">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
