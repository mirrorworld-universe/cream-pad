import { FlexProps, Image } from "@chakra-ui/react";
import Link from "next/link";

interface IProps extends FlexProps {
  site: string;
}

export default function SiteLogo({ site }: IProps) {
  return (
    <Link
      href={"/"}
      className="font-extrabold flex flex-shrink-0 items-center gap-2 text-[22px] cursor-pointer uppercase"
    >
      <Image alt="" src="/images/sonic.svg" className="size-8" />
      <p className="text-primary">Sonic</p>
      <p className="text-secondary font-normal">{site}</p>
    </Link>
  );
}
