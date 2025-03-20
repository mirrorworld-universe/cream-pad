import { Button, ButtonProps } from "@chakra-ui/react";
import { cn } from "@/utils";
export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "h-12 px-6 font-bold text-white bg-black rounded-full cursor-pointer",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
