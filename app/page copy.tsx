"use client";
import {
  Button,
  Center,
  Checkbox,
  FormControl,
  Input,
  Tooltip,
  useMediaQuery
} from "@chakra-ui/react";
import Link from "next/link";
import { toast } from "./components/common/toast";
import Pagination from "./components/common/Pagination";
import InfoIcon from "./components/icons/InfoIcon";

export default function Home() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <div className="py-10 flex-col gap-2 grid w-full grid-cols-2 mx-auto">
      <div className="flex flex-col gap-2">
        <Link href={"/icons"}>
          <Button>Go To Icons</Button>
        </Link>
        <Button
          onClick={() =>
            toast({
              title: "12 SOL Bridge to Sonic Completed",
              description: "this is description",
              status: "success",
              position: isMobile ? "top" : "top-right"
            })
          }
        >
          Toast Success
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            toast({
              title: "12 SOL Bridge to Sonic Failed",
              description: "this is description",
              status: "error",
              position: isMobile ? "top" : "top-right"
            })
          }
        >
          Toast Failed
        </Button>
        <Checkbox checked>Only show delegateable</Checkbox>
        <FormControl>
          <Input variant={"sonic"} placeholder="Enter your private key here" />
        </FormControl>
        <FormControl isInvalid>
          <Input variant={"sonic"} placeholder="Enter your private key here" />
        </FormControl>
        <Tooltip
          label="Displayed numbers only reflect successful referrals that received Sonic rewards due to the daily cap on $veSonic distribution. 
Today’s Remaining $veSonic: 12,300/30,000"
          placement="top"
        >
          <Center>
            <InfoIcon className="text-icon hover:text-primary" />
          </Center>
        </Tooltip>
        <Pagination total={15} />
      </div>
      <div className="flex flex-col gap-2">
        <Button size={"large"}>Large</Button>
        <Button size={"medium"}>Medium</Button>
        <Button size={"small"}>Small</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"outline"}>Outline</Button>
        <Button>Scroll Bar Below</Button>
        <div className="h-48 overflow-auto font-manrope">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
            quasi eligendi quas numquam aperiam et architecto ea qui libero
            quidem itaque provident, minus nesciunt officia fugit! Saepe,
            mollitia similique.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
            quasi eligendi quas numquam aperiam et architecto ea qui libero
            quidem itaque provident, minus nesciunt officia fugit! Saepe,
            mollitia similique.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
            quasi eligendi quas numquam aperiam et architecto ea qui libero
            quidem itaque provident, minus nesciunt officia fugit! Saepe,
            mollitia similique.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
            quasi eligendi quas numquam aperiam et architecto ea qui libero
            quidem itaque provident, minus nesciunt officia fugit! Saepe,
            mollitia similique.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nisi,
            quasi eligendi quas numquam aperiam et architecto ea qui libero
            quidem itaque provident, minus nesciunt officia fugit! Saepe,
            mollitia similique.
          </p>
        </div>
      </div>
    </div>
  );
}
