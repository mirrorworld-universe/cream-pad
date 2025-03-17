import { Icon, IconProps } from "@chakra-ui/react";

export default function SwitchIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 18L4 12L10 6V18Z" fill="currentColor" />
      <path d="M14 6L20 12L14 18L14 6Z" fill="currentColor" />
    </Icon>
  );
}

SwitchIcon.displayName = "SwitchIcon";
