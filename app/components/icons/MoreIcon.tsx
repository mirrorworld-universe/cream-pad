import { Icon, IconProps } from "@chakra-ui/react";

export default function MoreIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" color={"#D9D9D9"} {...props}>
      <rect x="4.5" y="10.5" width="3" height="3" fill="currentColor" />
      <rect x="10.5" y="10.5" width="3" height="3" fill="currentColor" />
      <rect x="16.5" y="10.5" width="3" height="3" fill="currentColor" />
    </Icon>
  );
}

MoreIcon.displayName = "MoreIcon";
