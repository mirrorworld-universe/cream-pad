import { Icon, IconProps } from "@chakra-ui/react";

export default function FeeIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 20L20 4" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

FeeIcon.displayName = "FeeIcon";
