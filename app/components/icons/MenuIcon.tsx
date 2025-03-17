import { Icon, IconProps } from "@chakra-ui/react";

export default function MenuIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 5H21V7H3V5Z" fill="currentColor" />
      <path d="M3 11H21V13H3V11Z" fill="currentColor" />
      <path d="M21 17H3V19H21V17Z" fill="currentColor" />
    </Icon>
  );
}

MenuIcon.displayName = "MenuIcon";
