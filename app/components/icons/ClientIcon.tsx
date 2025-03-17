import { Icon, IconProps } from "@chakra-ui/react";

export default function ClientIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12.5591 8.66082L14.0206 7.34087L15.5002 8.75V4H17.5002V8.75L18.9798 7.34087L20.4413 8.66082L16.5002 12.4143L12.5591 8.66082Z"
        fill="currentColor"
      />
      <path
        d="M3 4H12V6H5V16H19V13H21V18H15V20H9V18H3V4Z"
        fill="currentColor"
      />
    </Icon>
  );
}

ClientIcon.displayName = "ClientIcon";
