import { Button, ButtonProps } from "@chakra-ui/react";
import { cn } from "@/utils";
export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "h-14 px-6 font-bold text-white bg-black rounded-full",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
