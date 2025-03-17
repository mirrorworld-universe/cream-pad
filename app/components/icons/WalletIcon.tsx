import { Icon, IconProps } from "@chakra-ui/react";

export default function WalletIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M16.5 13.5C16.9167 13.5 17.2708 13.3542 17.5625 13.0625C17.8542 12.7708 18 12.4167 18 12C18 11.5833 17.8542 11.2292 17.5625 10.9375C17.2708 10.6458 16.9167 10.5 16.5 10.5C16.0833 10.5 15.7292 10.6458 15.4375 10.9375C15.1458 11.2292 15 11.5833 15 12C15 12.4167 15.1458 12.7708 15.4375 13.0625C15.7292 13.3542 16.0833 13.5 16.5 13.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 21V17H22V7H21V3H3V21H21ZM19 5V7H11V17H19V19H5V5H19ZM13 9H20V15H13V9Z"
        fill="currentColor"
      />
    </Icon>
  );
}

WalletIcon.displayName = "WalletIcon";
