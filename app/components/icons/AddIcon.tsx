import { Icon, IconProps } from "@chakra-ui/react";

export default function AddIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="11" width="18" height="2" fill="currentColor" />
      <rect
        x="13"
        y="3"
        width="18"
        height="2"
        transform="rotate(90 13 3)"
        fill="currentColor"
      />
    </Icon>
  );
}

AddIcon.displayName = "AddIcon";
