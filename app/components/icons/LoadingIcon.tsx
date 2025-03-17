import { Icon, IconProps } from "@chakra-ui/react";

export default function LoadingIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12H20C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4V6Z"
        fill="currentColor"
      />
    </Icon>
  );
}

LoadingIcon.displayName = "LoadingIcon";
