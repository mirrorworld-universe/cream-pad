import { Flex, Center, Fade, useClipboard } from "@chakra-ui/react";
import CopyIcon from "../icons/CopyIcon";
import SelectedIcon from "../icons/SelectedIcon";

interface CopyTextProps {
  children: React.ReactNode;
  label: string;
}

export default function CopyText({ children, label }: CopyTextProps) {
  const { onCopy, setValue, hasCopied } = useClipboard("");
  return (
    <Flex
      onClick={() => {
        setValue(label);
        setInterval(() => {
          onCopy();
        }, 0);
      }}
      className="font-normal cursor-pointer text-sm items-center gap-1 text-tertary group hover:text-primary transition-colors"
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
