import { Button, ButtonProps } from "@chakra-ui/react";
import clsx from "clsx";

export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={clsx(
        "h-14 px-6 text-xl font-bold text-white bg-black rounded-full",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
