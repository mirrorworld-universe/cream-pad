import { Icon, IconProps } from "@chakra-ui/react";

export default function ArrowIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 6L16 12L10 18" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

ArrowIcon.displayName = "ArrowIcon";
