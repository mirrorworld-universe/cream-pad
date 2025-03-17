import { Icon, IconProps } from "@chakra-ui/react";

export default function ExitIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 21V3H13V5H6V19H13V21H4ZM17 17L15.625 15.55L18.175 13H10V11H18.175L15.625 8.45L17 7L22 12L17 17Z"
        fill="currentColor"
      />
    </Icon>
  );
}

ExitIcon.displayName = "ExitIcon";
