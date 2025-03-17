import { Icon, IconProps } from "@chakra-ui/react";

export default function MinusIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="11" width="18" height="2" fill="currentColor" />
    </Icon>
  );
}

MinusIcon.displayName = "MinusIcon";
