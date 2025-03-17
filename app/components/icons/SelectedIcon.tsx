import { Icon, IconProps } from "@chakra-ui/react";

export default function SelectedIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9.29448 19L3 12.3638L4.57362 10.7048L9.29448 15.6819L19.4264 5L21 6.65904L9.29448 19Z"
        fill="currentColor"
      />
    </Icon>
  );
}

SelectedIcon.displayName = "SelectedIcon";
