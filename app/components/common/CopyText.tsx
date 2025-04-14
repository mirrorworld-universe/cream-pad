import { Flex, Center, Fade, useClipboard } from "@chakra-ui/react";
import CopyIcon from "../icons/CopyIcon";
import SelectedIcon from "../icons/SelectedIcon";
import { useEffect } from "react";

interface CopyTextProps {
  children: React.ReactNode;
  label: string;
}

export default function CopyText({ children, label }: CopyTextProps) {
  const { onCopy, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(label);
  }, [label, setValue]);

  return (
    <Flex
      onClick={onCopy}
      className="cursor-pointer items-center gap-1 group transition-colors"
    >
      {children}
      <Center className="relative size-4">
        <Fade in={hasCopied}>
          <Center className="size-4 text-success absolute top-0 left-0">
            <SelectedIcon />
          </Center>
        </Fade>
        <Fade in={!hasCopied}>
          <CopyIcon className="group-hover:text-primary text-icon absolute top-0 left-0" />
        </Fade>
      </Center>
    </Flex>
  );
}
