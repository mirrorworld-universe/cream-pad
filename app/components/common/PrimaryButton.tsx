import { Button, ButtonProps } from "@chakra-ui/react";
import { cn } from "@/utils";
export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "h-12 px-6 font-bold text-white bg-black rounded-full transition-all cursor-pointer hover:bg-[#292929] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
