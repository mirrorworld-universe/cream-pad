import { Icon, IconProps } from "@chakra-ui/react";

export default function JumpIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7.77625 4H20L20 16.2238H17.9627V7.47788L5.44058 20L4 18.5594L16.5221 6.03729H7.77625V4Z"
        fill="currentColor"
      />
    </Icon>
  );
}

JumpIcon.displayName = "JumpIcon";
