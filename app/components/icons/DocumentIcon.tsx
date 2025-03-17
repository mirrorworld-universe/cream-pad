import { Icon, IconProps } from "@chakra-ui/react";

export default function DocumentIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M8 18H16V16H8V18ZM8 14H16V12H8V14ZM4 22V2H14L20 8V22H4ZM13 9V4H6V20H18V9H13Z"
        fill="currentColor"
      />
    </Icon>
  );
}

DocumentIcon.displayName = "DocumentIcon";
