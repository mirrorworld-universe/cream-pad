import { Icon, IconProps } from "@chakra-ui/react";

export default function CopyIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 18 19" fill="none" {...props}>
      <path
        d="M4.87506 5.16173V3.42957C4.87506 2.84708 5.34726 2.37488 5.92975 2.37488H15.0704C15.6529 2.37488 16.1251 2.84708 16.1251 3.42957V12.5702C16.1251 13.1527 15.6529 13.6249 15.0704 13.6249H13.3187"
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.0703 5.37512H2.92963C2.34714 5.37512 1.87494 5.84732 1.87494 6.42981V15.5704C1.87494 16.1529 2.34714 16.6251 2.92963 16.6251H12.0703C12.6527 16.6251 13.1249 16.1529 13.1249 15.5704V6.42981C13.1249 5.84732 12.6527 5.37512 12.0703 5.37512Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

CopyIcon.displayName = "CopyIcon";
