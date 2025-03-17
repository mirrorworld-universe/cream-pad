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
    <div className="py-10 flex-col gap-2 grid w-full grid-cols-2 mx-auto"></div>
  );
}
