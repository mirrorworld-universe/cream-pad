import { Icon, IconProps } from "@chakra-ui/react";

export default function ArrowDownIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M18 9L12 15L6 9L18 9Z" fill="currentColor" />
    </Icon>
  );
}

ArrowDownIcon.displayName = "ArrowDownIcon";
