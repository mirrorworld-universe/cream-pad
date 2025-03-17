import { Icon, IconProps } from "@chakra-ui/react";

export default function CopyIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.64706 3H20V18.3H7.64706V3ZM9.41176 4.8V16.5H18.2353V4.8H9.41176ZM4 8.5H5.76471V20.2H14.5882V22H4V8.5Z"
        fill="currentColor"
      />
    </Icon>
  );
}

CopyIcon.displayName = "CopyIcon";
