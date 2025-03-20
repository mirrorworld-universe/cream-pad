import CopyIcon from "@/app/components/icons/CopyIcon";

export default function BasicInfo() {
  return (
    <>
      <p className="text-3xl font-baloo2 font-bold mb-8">
        Basic Information Module
      </p>
      <div className="flex items-center gap-2 font-medium text-2xl mb-6">
        <span>Token Name</span>
        <img className="size-12" src="/images/sonic-token.png" alt="sonic" />
        <span>Sonic SVM (Symbol)</span>

        <div className="ml-auto flex items-center">
          <div className="size-10 rounded-full bg-[#E8FF59] flex items-center justify-center">
            <img src="/images/time.svg" alt="time" />
          </div>
          <div className="h-3 w-2 bg-[#E8FF59]"></div>
          <div className="px-5 h-10 bg-[#E8FF59] rounded-full flex items-center justify-center text-base">
            Next Auction in: 3 mins
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-[100px] gap-y-6 mb-11">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/blockchain.png"
              alt="blockchain"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">Blockchain:</p>
              <p className="font-baloo2 font-semibold">Sonic svm</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/mint-address.png"
              alt="mint-address"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">Mint Address:</p>
              <div className="font-baloo2 font-semibold cursor-pointer">
                0xf2fBD...88bFE <CopyIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/social.png"
              alt="social"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">Social media:</p>
              <div className="font-baloo2 font-semibold flex items-center gap-2">
                <img
                  className="size-5"
                  src="/images/activity/x.svg"
                  alt="twitter"
                />
                <img
                  className="size-5"
                  src="/images/activity/tg.svg"
                  alt="telegram"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/remain.png"
              alt="remain"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">
                Remaining Token in this Auction Round (%):
              </p>
              <p className="font-baloo2 font-semibold">869,863 (20%)</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/fdv.png"
              alt="fdv"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">FDV:</p>
              <p className="font-baloo2 font-semibold">$100k</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded-2xl"
              src="/images/round.png"
              alt="round"
            />
            <div className="space-y-2">
              <p className="text-[#666] text-sm">
                Current Auction Rounds/Total Rounds:
              </p>
              <p className="font-baloo2 font-semibold">1/10</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
