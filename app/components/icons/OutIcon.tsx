import { Icon, IconProps } from "@chakra-ui/react";

export default function OutIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 21L3 21L3 12L5 12L5 19L19 19L19 12L21 12L21 21ZM17 8L15.55 9.375L13 6.825L13 15L11 15L11 6.825L8.45 9.375L7 8L12 3L17 8Z"
        fill="currentColor"
      />
    </Icon>
  );
}

OutIcon.displayName = "OutIcon";
