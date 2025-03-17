import { Icon, IconProps } from "@chakra-ui/react";

export default function InIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8.45 8.625L7 10L12 15L17 10L15.55 8.625L13 11.175V3H11L11 11.175L8.45 8.625Z"
        fill="currentColor"
      />
      <path d="M3 21H21V12H19V19L5 19L5 12H3V21Z" fill="currentColor" />
    </Icon>
  );
}

InIcon.displayName = "InIcon";
