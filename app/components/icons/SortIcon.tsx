import { Icon, IconProps } from "@chakra-ui/react";

export default function SortIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 10L12 4L18 10L6 10Z" fill="currentColor" />
      <path d="M18 14L12 20L6 14L18 14Z" fill="currentColor" />
    </Icon>
  );
}

SortIcon.displayName = "SortIcon";
